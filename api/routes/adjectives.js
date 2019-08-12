const { Router } = require("express");
const { basicFilter } = require("../utils");
const { adjectives, suffixes } = require("../data/adjectives");

const router = Router();

router.get("/adjectives", (req, res) => {
	let data = adjectives;
	const { startsWith, endsWith, limit } = req.query;

	data = basicFilter(data, { startsWith, endsWith, limit });

	res.jsonEx(data);
});

/**
 * @api {get} /adjectives/suffixes get common suffixes
 * @apiGroup Adjectives
 */
router.get("/adjectives/suffixes", (req, res) => {
	let data = suffixes;
	const { flat } = req.query;

	if (flat) {
		data = [].concat(...data);
	}

	res.jsonEx(data);
});
module.exports = router;
