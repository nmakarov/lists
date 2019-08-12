// const url = require('url')
// const config = require('../src/config')
// const inboundProxy = url.parse(config.authorizationProxy.inbound);
const { version } = require("../../../package.json");

const params = {};
params.startsWith = {
	name: "startsWith",
	in: "query",
	required: false,
	type: "string",
	description: "Optional filter - starts with",
};

params.endsWith = {
	name: "endsWith",
	in: "query",
	required: false,
	type: "string",
	description: "Optional filter - ends with",
};

params.limit = {
	name: "limit",
	in: "query",
	required: false,
	type: "number",
	description: "Optional filter - how many records to return",
};

params.flat = {
	name: "flat",
	in: "query",
	required: false,
	type: "boolean",
	description: "If specified, return the plain array, otherwise - grouped",
};

const paths = {};
paths["/adjectives"] = {
	get: {
		tags: ["adjectives"],
		description: "",
		parameters: [
			params.startsWith,
			params.endsWith,
			params.limit,
		],
		responses: {
			200: {
				description: "",
				schema: {
					type: "object",
					$ref: "#/definitions/ok",
				},
			},
			500: {
				description: "",
				schema: {
					type: "object",
					$ref: "#/definitions/badRequestError",
				},
			},
		},
	},
};

paths["/adjectives/suffixes"] = {
	get: {
		tags: ["adjectives"],
		description: "Return all common adjective suffixes",
		parameters: [
			params.flat,
		],
		responses: {
			200: {
				description: "",
				schema: {
					type: "object",
					$ref: "#/definitions/ok",
				},
			},
			500: {
				description: "",
				schema: {
					type: "object",
					$ref: "#/definitions/badRequestError",
				},
			},
		},
	},
};

const definitions = {};
definitions.ok = {
	type: "object",
	properties: {
		data: {
			type: "array",
			items: {
				AnyValue: {},
			},
		},
		length: {
			type: "integer",
			description: "How many objects are in the `data` (if it is an array)",
		},
		server: {
			type: "integer",
			description: "Time (in ms) that took to handle the request",
		},
	},
};

definitions.badRequestError = {
	type: "object",
	properties: {
		type: {
			type: "string",
			default: "BadRequest",
		},
		status: {
			type: "integer",
			default: 400,
		},
		fields: {
			type: "array",
			items: {
				type: "object",
				properties: {
					type: {
						type: "string",
					},
					status: {
						type: "integer",
					},
					message: {
						type: "string",
					},
					stack: {
						type: "array",
						items: {
							type: "string",
						},
					},
				},
			},
		},
		message: {
			type: "string",
		},
		stack: {
			type: "array",
			items: {
				type: "string",
			},
		},
	},

};

const swagger = {
	swagger: "2.0",
	// host: "localhost:4321",
	info: {
		version,
		title: "Lists",
	},
	basePath: "/",
	//   schemes: [  ],
	consumes: [
		"application/json",
	],
	produces: [
		"application/json",
	],
	paths,
	definitions,
};


module.exports = swagger;
