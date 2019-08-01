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

app.listen(4321, () => {
	console.info("API Server listening on 4321");
});
