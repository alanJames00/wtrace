import { Hono } from 'hono';

const app = new Hono();

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
		return c.json({
			message: 'hello from register',
		});
	} catch (e) {
		console.log(e);
		return c.json({ e: e.message }, 500);
	}
});

export default app;
