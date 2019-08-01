const { Router } = require("express");
const { randomSelection } = require("../utils");
const { adjectives, suffixes } = require("../data/adjectives");

const router = Router();

router.get("/adjectives", (req, res) => {
	let data = adjectives;
	const { startsWith, endsWith, limit } = req.query;

	if (startsWith) {
		data = data.filter($ => (new RegExp(`^${startsWith}`, "i")).test($));
	}

	if (endsWith) {
		data = data.filter($ => (new RegExp(`${endsWith}$`, "i")).test($));
	}

	if (limit) {
		data = randomSelection(data, limit);
	}

	res.jsonEx(data);
});

router.get("/adjectives/suffixes", (req, res) => {
	let data = suffixes;
	const { flat } = req.query;

	if (flat) {
		data = [].concat(...data);
	}

	res.jsonEx(data);
});
module.exports = router;
