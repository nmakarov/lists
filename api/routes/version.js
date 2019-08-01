const { Router } = require("express");

const router = Router();

router.get("/version", (req, res) => {
	res.json({ status: "ok" });
});

module.exports = router;
