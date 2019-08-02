const server = require("./server");

const config = {
	port: 4321,
};

server.listen(config.port, () => {
	console.info("API Server listening on", server.address().port);
});
