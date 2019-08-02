const Joi = require('@hapi/joi');

const validator = Joi.object().keys({
	// data: Joi.array().items(Joi.string()),
	data: Joi.array(),
	limit: Joi.number().integer().min(1)
});

const randomSelection = (data, limit=1) => {
	const v = validator.validate({data, limit});
	if (v.error) {
		throw v;
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

module.exports = {
	randomSelection,
};
