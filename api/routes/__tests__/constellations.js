const request = require("supertest");
const server = require("../../server");

describe("Test the constellations path", () => {
	test("/constellations", async () => {
		const response = await request(server).get("/constellations");
		expect(response.statusCode).toBe(200);
		expect(response.body.data).toContain("capricornus");
		expect(response.body.data.length).toBe(88);
	});
});
