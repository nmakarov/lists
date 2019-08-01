const Express = require("express");
const app = Express();

const randomSelection = (data, limit) => {
    const l = data.length;
    const tmp = Array.from(new Array(l).keys());
    for (let i = 0; i < limit; i++) {
        const r = Math.floor(Math.random() * l);
        [tmp[i], tmp[r]] = [tmp[r], tmp[i]];
    }
    return tmp.slice(0, limit).map($ => data[$]);
}

app.use((req, res, next) => {
    const start = +(new Date);
    res.jsonEx = data => {
        res.json({
            data,
            length: data.length,
            server: +(new Date) - start
        });
    };
    next();
});

app.get("/version", (req, res) => {
    res.json({status: "ok"});
});

app.get("/countries", (req, res) => {
    let data = require("./data/countries");
    const { startsWith } = req.query;

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

app.get("/adjectives", (req, res) => {
    let data = require("./data/adjectives").adjectives;
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

app.get("/adjectives/suffixes", (req, res) => {
    const { flat } = req.query;

    let data = require("./data/adjectives").suffixes;

    if (flat) {
        data = [].concat(...data);
    }

    res.jsonEx(data);
});

app.listen(4321, () => {
    console.info("API Server listening on 4321");
});