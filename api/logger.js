const winston = require("winston");
// const moment = require("moment");
const config = require("lastconf");

const customFormat = winston.format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
	level: config.get("logger.level"),
	json: false,
	format: winston.format.combine(
		winston.format.colorize(),
		// winston.format.label({ label: ':' }),
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm" }),
		// winston.format((info, opts) =>
		// { info.timestamp=moment().format("MM-DD HH:MM"); return info; })(),
		customFormat,
	),
	transports: [
		new winston.transports.Console({
			// level: "debug",
			json: false,
			colorize: true,
		}),
	],
});

logger.stream = {
	write(message, encoding) {
		logger.info(message);
	},
};

module.exports = logger;
