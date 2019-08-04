const { Router } = require("express");
const { basicFilter } = require("../utils");
const constellations = require("../data/constellations");

const router = Router();

router.get("/constellations", (req, res) => {
	let data = constellations;
	const { startsWith, endsWith, limit } = req.query;

	data = data.map($ => $.toLowerCase());

	data = basicFilter(data, { startsWith, endsWith, limit });

	res.jsonEx(data);
});

module.exports = router;
