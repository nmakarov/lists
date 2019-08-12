const Redis = require("async-redis");
const { RedisError } = require("../errors");

const redis = Redis.createClient({
	// host: "lists.tamaeq.ng.0001.usw2.cache.amazonaws.com",
});

redis.on("error", (err) => {
	throw new RedisError(err);
});

module.exports = redis;
