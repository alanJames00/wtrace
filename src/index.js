import { Hono } from 'hono';
import authWare from './middlewares/auth';

const app = new Hono();

// utils functions
// route to log the request
app.get('/log', async (c) => {
	try {
		// get all the information in the headers

		const referId = c.req.header('w-refer-id');

		const cfHeaders = JSON.stringify(c.req.raw.cf);

		const orgIp = c.req.header('CF-Connecting-IP');
		const ipCountry = c.req.header('CF-IPCountry');
		const userAgent = c.req.header('User-Agent');

		console.log(orgIp);
		console.log(ipCountry);
		console.log(userAgent);
		console.log(cfHeaders);
		console.log(referId);

		// store the data in reqeusts table
		const { results, success } = await c.env.DB.prepare(
			'INSERT INTO Requests (refer_code, req_country, req_org_ip, req_user_agent, cf_header_raw) VALUES (?, ?, ?, ?, ?)',
		)
			.bind(referId, ipCountry, orgIp, userAgent, cfHeaders)
			.all();

		if (!success) {
			return c.json({
				err: 'error logging request',
			});
		}

		return c.json({
			info: 'logged',
		});
	} catch (e) {
		console.log(e);
		return c.json(
			{
				err: e.message,
			},
			500,
		);
	}
});

// route to obtain an apiToken
app.post('/register', async (c) => {
	try {
		const body = await c.req.json();

		// check if username exist in db
		const { results: userExist } = await c.env.DB.prepare('SELECT * FROM Users WHERE username = ?').bind(body.username).all();

		if (userExist.length > 0) {
			// return username already exist
			return c.json(
				{
					err: 'username already in use',
				},
				400,
			);
		}

		// else create the user
		// generate an uuid based api key
		const apiKey = await crypto.randomUUID();

		const { results: userCreated, success } = await c.env.DB.prepare('INSERT INTO Users (username, api_key) VALUES (?, ?)')
			.bind(body.username, apiKey)
			.all();

		if (success) {
			return c.json({ info: 'user created', apiKey: apiKey }, 201);
		}

		// handle failed write request
		return c.json(
			{
				err: 'user cannot be created (internal server failure)',
			},
			500,
		);
	} catch (e) {
		console.log(e);
		return c.json({ e: e.message }, 500);
	}
});

// route to obtain a referId for the sending along with the request
app.post('/referId', authWare, async (c) => {
	try {
		const username = c.get('username');

		// generate a random alphanumeric six digits referId
		// loop until unique referId is generated
		const uuid = await crypto.randomUUID();
		const referId = uuid.substring(uuid.length - 9, uuid.length - 1).toUpperCase();

		// check if the referId is unique in the Refercodes table in the db
		const { results: referIdExists } = await c.env.DB.prepare('SELECT * FROM Refercodes WHERE refer_code = ?').bind(referId).all();
		if (referIdExists.length > 0) {
			return c.json({
				err: 'cannot generate referId, try again after sometime',
			});
		}

		// write to table
		const { results: referIdResult, success } = await c.env.DB.prepare('INSERT INTO Refercodes (username, refer_code) VALUES (?, ?)')
			.bind(username, referId)
			.all();

		if (!success) {
			return c.json({
				err: 'cannot generate referId, try again after sometime',
			});
		}
		return c.json({
			referId,
			info: username,
		});
	} catch (e) {
		console.log(e);
		return c.json(
			{
				err: e.message,
			},
			500,
		);
	}
});

export default app;
