import { Hono } from 'hono';

const app = new Hono();

// utils functions
// route to log the request
app.get('/log', async (c) => {
	try {
		return c.json({
			message: 'hello',
		});
	} catch (e) { }
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

export default app;
