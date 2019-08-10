const config = require("lastconf");
const server = require("./server");
const logger = require("./logger");

server.listen(config.get("port"), () => {
	logger.info(`[${config.env}] API Server listening on ${server.address().port}`);
});
