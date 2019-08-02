const request = require("supertest");
const server = require("../../server");

describe("Test the countries path", () => {
	test("/countries", async () => {
		const response = await request(server).get("/countries");
		expect(response.statusCode).toBe(200);
		expect(response.body.data).toContain("spain");
		expect(response.body.data.length).toBe(243);
	});
});
