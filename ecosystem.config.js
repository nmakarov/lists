module.exports = {
	apps : [{
		name : "lists",
		script: "./api/index.js",
		env: {
			NODE_ENV: "production",
		},
	}]
};
