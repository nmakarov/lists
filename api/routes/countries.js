const { Router } = require("express");
const { randomSelection } = require("../utils");
const countries = require("../data/countries");

const router = Router();

router.get("/countries", (req, res) => {
	let data = countries;
	const { startsWith, endsWith, limit } = req.query;

	if (startsWith) {
		data = data.filter($ => (new RegExp(`^${startsWith}`, "i")).test($.name));
	}

	if (endsWith) {
		data = data.filter($ => (new RegExp(`${endsWith}$`, "i")).test($));
	}

	if (limit) {
		data = randomSelection(data, limit);
	}

	data = data.map($ => $.name);

	res.jsonEx(data);
});

module.exports = router;
