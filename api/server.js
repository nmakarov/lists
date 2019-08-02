const http = require("http");
const Express = require("express");

const serverTime = require("./middlewares/serverTime");
const versionRouter = require("./routes/version");
const countriesRouter = require("./routes/countries");
const adjectivesRouter = require("./routes/adjectives");

const app = Express();


app.use(serverTime);

app.use(versionRouter);
app.use(countriesRouter);
app.use(adjectivesRouter);

app.use((error, req, res, next) => {
	console.info(error);
	res.status(500).json({
		errors: error.error && error.error.details ? error.error.details.map($ => $.message) : error,
	});
});

module.exports = http.createServer(app);
