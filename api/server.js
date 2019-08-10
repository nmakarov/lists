const http = require("http");
const Express = require("express");
const morgan = require("morgan");
const boom = require("express-boom");

const config = require("lastconf")({ folder: "api/config" });
const logger = require("./logger");
const serverTime = require("./middlewares/serverTime");
const versionRouter = require("./routes/version");
const countriesRouter = require("./routes/countries");
const adjectivesRouter = require("./routes/adjectives");
const constellationsRouter = require("./routes/constellations");

const errors = require("./errors");

const app = Express();

app.use(boom());
app.use(morgan("tiny", {
	stream: logger.stream,
	skip: (req, res) => config.env === "test",
}));

app.use(serverTime);

app.use((req, res, next) => {
	logger.debug(`${req.method} ${req.url}`);
	next();
});

app.use(versionRouter);
app.use(countriesRouter);
app.use(adjectivesRouter);
app.use(constellationsRouter);

app.use("*", (req, res) => {
	throw new errors.NotFoundError(req.baseUrl);
});

app.use((error, req, res, next) => {
	const json = {
		statusCode: "500",
		error: "Error",
		// message: "Error happened"
	};

	if (error instanceof errors.ApiError) {
		json.statusCode = error.code ? error.code : 500;
		json.error = error.name;
		if (error.data) {
			json.data = error.data;
		}
	}

	let msg = json.error;
	if (json.data) {
		msg += ` - ${JSON.stringify(json.data)}`;
	}
	logger.error(msg);
	res.status(json.statusCode).json(json);
});

module.exports = http.createServer(app);
