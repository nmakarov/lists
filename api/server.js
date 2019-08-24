const http = require("http");
const Express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const path = require("path");
// const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("lastconf")({ folder: "api/config" });

const redis = require("./adapters/redis");

const logger = require("./logger");
const serverTime = require("./middlewares/serverTime");
const versionRouter = require("./routes/version");
const countriesRouter = require("./routes/countries");
const adjectivesRouter = require("./routes/adjectives");
const constellationsRouter = require("./routes/constellations");
const currencyRouter = require("./routes/currency");

const errors = require("./errors");

const app = Express();

// curl -X POST localhost:4321/stash/a  -d {\"key\":\"value\"} -H "Content-Type: application/json"
app.use(bodyParser.json({ type: "application/*+json" }));
// curl localhost:4321/stash/text/a -X POST -d "abc"  -H "Content-Type: text/html"
app.use(bodyParser.text({ type: "text/html" }));
// curl -X POST localhost:4321/stash/a  -d "aaa=123"
// app.use(bodyParser.urlencoded({ extended: true }));

const swaggerSpec = require("./routes/swagger");

app.get("/swagger.json", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.json(swaggerSpec);
});
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use(currencyRouter);


app.get("/stash/text/:id", async (req, res) => {
	const { id } = req.params;
	const data = await redis.get(id);
	await redis.del(id);
	res.end(data);
});

app.post("/stash/text/:id", async (req, res) => {
	const { id } = req.params;
	const { body } = req;
	console.info(">> body:", body);
	await redis.set(id, body);
	res.end("ok");
});

app.get("/stash/:id", async (req, res) => {
	const { id } = req.params;
	const data = JSON.parse(await redis.get(id));
	await redis.del(id);
	res.json({
		id, data,
	});
});

app.post("/stash/:id", async (req, res) => {
	const { id } = req.params;
	const { body } = req;
	await redis.set(id, JSON.stringify(body));
	res.json({
		id, body,
	});
});


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
