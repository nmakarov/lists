const { Router } = require("express");
const { basicFilter } = require("../utils");
const countries = require("../data/countries");

const router = Router();

router.get("/countries", (req, res) => {
	let data = countries;
	const { startsWith, endsWith, limit } = req.query;

	data = data.map($ => $.name.toLowerCase());

	data = basicFilter(data, { startsWith, endsWith, limit });

	res.jsonEx(data);
});

module.exports = router;
