const Express = require("express");

const app = Express();

app.use((req, res, next) => {
	const start = +(new Date());
	res.jsonEx = (data) => {
		res.json({
			data,
			length: data.length,
			server: +(new Date()) - start,
		});
	};
	next();
});

module.exports = app;
