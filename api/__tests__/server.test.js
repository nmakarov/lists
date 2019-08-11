const request = require("supertest");
const server = require("../server");

describe("Test the root path", () => {
	test("It should response the GET method", async () => {
		const response = await request(server).get("/version");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the 404", () => {
	it("Should work", async () => {
		const response = await request(server).get("/abraaa");
		expect(response.statusCode).toBe(404);
	});
});
