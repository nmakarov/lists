const Joi = require("@hapi/joi");
const { ValidationError } = require("./errors");
// const logger = require("./logger");

const validator = Joi.object().keys({
	// data: Joi.array().items(Joi.string()),
	data: Joi.array(),
	limit: Joi.number().integer().min(1),
});

const randomSelection = (data, limit = 1) => {
	const v = validator.validate({ data, limit });
	if (v.error) {
		throw new ValidationError(v);
	}

	const l = data.length;
	const _limit = limit < l ? limit : l;
	const tmp = Array.from(new Array(l).keys());
	for (let i = 0; i < _limit; i++) {
		const r = Math.floor(Math.random() * l);
		[tmp[i], tmp[r]] = [tmp[r], tmp[i]];
	}
	return tmp.slice(0, _limit).map($ => data[$]);
};

const basicFilter = (data, { startsWith, endsWith, limit }) => {
	let d = data;
	if (startsWith) {
		d = d.filter($ => (new RegExp(`^${startsWith}`, "i")).test($));
	}

	if (endsWith) {
		d = d.filter($ => (new RegExp(`${endsWith}$`, "i")).test($));
	}

	if (limit) {
		d = randomSelection(d, limit);
	}

	return d;
};

module.exports = {
	randomSelection,
	basicFilter,
};
