const Express = require("express");

const app = Express();

app.use((req, res, next) => {
	const start = +(new Date());
	res.jsonEx = (data, extra={}) => {
		res.json({
			data,
			length: data.length,
			server: `${(+(new Date()) - start)/1000} ms`,
			...extra
		});
	};
	next();
});

module.exports = app;
