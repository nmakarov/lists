const config = require("lastconf");
const server = require("./server");

server.listen(config.get("port"), () => {
	console.info(`[${config.env}] API Server listening on ${server.address().port}`);
});
