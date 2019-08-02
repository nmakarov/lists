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

module.exports = http.createServer(app);
