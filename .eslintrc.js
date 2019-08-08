module.exports = {
	"extends": "airbnb-base",
	"env": {
		"jest": true
	},
    "rules": {
        "no-tabs": 0,
        "indent": [2, "tab"],
        "quotes": [2, "double"],
		"no-plusplus": 0,
		"no-unused-vars": ["error", { "argsIgnorePattern": "next|req|res|encoding" }],
		"no-underscore-dangle": 0,
    }
};
