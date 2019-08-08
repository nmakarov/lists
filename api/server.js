const http = require("http");
const Express = require("express");
const morgan = require("morgan");

const config = require("lastconf")({ folder: "api/config" });
const logger = require("./logger");
const serverTime = require("./middlewares/serverTime");
const versionRouter = require("./routes/version");
const countriesRouter = require("./routes/countries");
const adjectivesRouter = require("./routes/adjectives");
const constellationsRouter = require("./routes/constellations");

const app = Express();



app.use(morgan("tiny", {
	stream: logger.stream,
	skip: (req, res) => process.env.NODE_ENV === "test",
}));

logger.debug("here");
app.use(serverTime);

app.use(versionRouter);
app.use(countriesRouter);
app.use(adjectivesRouter);
app.use(constellationsRouter);

app.use((error, req, res, next) => {
	let msg = null;

	// validation errors
	if (error.error && error.error.isJoi) {
		msg = `Validation error: ${error.error.details.map($ => $.message)}`;
	} else {
		msg = error;
	}
	logger.error(msg);

	res.status(500).json({
		errors: msg,
	});
});

module.exports = http.createServer(app);
