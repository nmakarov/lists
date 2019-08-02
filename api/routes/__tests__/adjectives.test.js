const request = require("supertest");
const server = require("../../server");

describe("Test the adjectives path", () => {
	test("/adjectives", async () => {
		const response = await request(server).get("/adjectives");
		expect(response.statusCode).toBe(200);
		expect(response.body.data).toContain("abandoned");
		expect(response.body.data.length).toBe(1339);
	});

	test("/adjectives/suffixes", async () => {
		const response = await request(server).get("/adjectives/suffixes");
		expect(response.statusCode).toBe(200);
		expect(response.body.data).toContain("ed");
		expect(response.body.data.length).toBe(15);
	});
});
