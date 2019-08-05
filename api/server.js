const http = require("http");
const Express = require("express");
const morgan = require("morgan");

const serverTime = require("./middlewares/serverTime");
const versionRouter = require("./routes/version");
const countriesRouter = require("./routes/countries");
const adjectivesRouter = require("./routes/adjectives");
const constellationsRouter = require("./routes/constellations");

const app = Express();

app.use(morgan("tiny", { skip: (req, res) => process.env.NODE_ENV==="test" }));
app.use(serverTime);

app.use(versionRouter);
app.use(countriesRouter);
app.use(adjectivesRouter);
app.use(constellationsRouter);

app.use((error, req, res, next) => {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
		console.info(error);
	}
	res.status(500).json({
		errors: error.error && error.error.details ? error.error.details.map($ => $.message) : error,
	});
});

module.exports = http.createServer(app);
