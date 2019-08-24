const { Router } = require("express");
const axios = require("axios");
const moment = require("moment");
const _ = require("lodash");

const router = Router();
const redis = require("../adapters/redis");

/*

/currency

/currency/symbols

/currency/latest
/currency/2019-01-01

/currency/stats

?base=CAD
?symbols=USD,RUB,CAD
?start=2019-01-01
?end=2019-01-31
?date=2019-01-01
?origin=cache|remote|true - fetch from cache only / remote only / show origin in the response


{
	base: "CAD",

	origin: "cache" | "live"

	// single date:
	data: {
		USD: 0.7633333,
		RUB: 49,535433,
	}

	// start + end:
	data: [
		"2019-01-01": {
			USD: 0.7633333,
			RUB: 49,535433,
		},
		"2019-01-02": {
			USD: 0.7633333,
			RUB: 49,535433,
		},
	]

	// fluctuations:
	data: {
		USD: {
			start: 0.7633333,
			end: 0.77545234,
			change: 0.02
			fluctuation: 0.12%
		},
		RUB: { ... }
	}

}

*/

const hashkey = "currency";

const fetchRate = async date => axios({
	method: "GET",
	baseURL: "https://api.ratesapi.io/api",
	url: `/${date}`,
	params: { base: "USD" }
});

router.get("/currency", async (req, res) => {
	const { base, symbols, start, end, date } = req.query;

	const b = base || "USD";
	const d = moment(date ? date : undefined).format("YYYY-MM-DD");

	let dayRates = {};

	let origin = "cache";

	// await redis.del(hashkey);
	const redisRates = await redis.hget(hashkey, d);
	if (redisRates) {
		dayRates = JSON.parse(redisRates);
	} else {
		const response = await fetchRate(d);
		dayRates = response.data.rates;
		await redis.hset(hashkey, d, JSON.stringify(dayRates));
		origin = "remote";
	}

	const rates = symbols ? _.pick(dayRates, symbols.split(/,\s*/)): dayRates;
	if ( b !== "USD") {
		const u = rates[b];
		Object.keys(rates).forEach(k => {
			rates[k] /= u;
		})
	}
	res.jsonEx(rates, { base: b, origin });
});

module.exports = router;
