// middleware auth
const authWare = async (c, next) => {
	// check if the apiKey match and exist in the db
	const apiKey = await c.req.header('x-auth-key');

	if (!apiKey) {
		return c.json(
			{
				err: 'provide x-auth-key in request header',
			},
			401,
		);
	}

	// then check if the key exist in the db
	const { results: keyExist } = await c.env.DB.prepare('SELECT * FROM Users WHERE api_key = ?').bind(apiKey).all();
	if (keyExist.length == 0) {
		return c.json(
			{
				err: 'unauthorized api key',
			},
			401,
		);
	}

	next();
};

export default authWare;
