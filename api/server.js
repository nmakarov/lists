const Express = require("express");
const app = Express();

app.get("/version", (req, res) => {
    res.json({status: "ok"});
});

app.get("/countries", (req, res) => {
    let data = require("./data/countries");
    const { startsWith } = req.query;

    if (startsWith) {
        data = data.filter($ => (new RegExp(`^${startsWith}`, "i")).test($.name));
    }

    data = data.map($ => $.name);
    res.json({
        data,
        length: data.length
    });
});

app.get("/adjectives", (req, res) => {
    let data = require("./data/adjectives").adjectives;
    const { startsWith } = req.query;

    if (startsWith) {
        data = data.filter($ => (new RegExp(`^${startsWith}`, "i")).test($));
    }

    res.json({
        data,
        length: data.length
    });
});

app.listen(4321, () => {
    console.info("API Server listening on 4321");
});