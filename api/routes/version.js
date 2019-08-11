const { Router } = require("express");
const { version } = require("../../package.json");

const router = Router();

router.get("/version", (req, res) => {
	res.json({ status: "ok", version });
});

module.exports = router;
