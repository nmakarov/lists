class ApiError extends Error {
	constructor(msg) {
		super(msg);
		this.name = this.constructor.name;
	}
}

class ValidationError extends ApiError {
	constructor(joeError) {
		super("validation");
		// this.data = {};
		// for (const e of joeError.error.details) {
		// 	this.data[e.context.key] = e.message;
		// }

		this.data = joeError.error.details.reduce((r, e) => {
			const rr = r;
			rr[e.context.key] = e.message;
			return rr;
		}, {});
	}
}

class NotFoundError extends ApiError {
	constructor(path) {
		super(`${path} – not found`);
		this.code = 404;
	}
}

module.exports = {
	ApiError,
	ValidationError,
	NotFoundError,
};
