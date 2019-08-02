const request = require("supertest");
const server = require("../../server");

describe("Test the adjectives path", () => {
	describe("happy", () => {
		test("/adjectives", async () => {
			const response = await request(server).get("/adjectives");
			expect(response.statusCode).toBe(200);
			expect(response.body.data).toContain("abandoned");
			expect(response.body.data.length).toBe(1339);
		});

		test("/adjectives?startsWith=a", async () => {
			const response = await request(server).get("/adjectives?startsWith=a");
			expect(response.statusCode).toBe(200);
			expect(response.body.data).toContain("abandoned");
			expect(response.body.data.length).toBe(78);
		});

		test("/adjectives?endsWith=ed", async () => {
			const response = await request(server).get("/adjectives?endsWith=ed");
			expect(response.statusCode).toBe(200);
			expect(response.body.data).toContain("abandoned");
			expect(response.body.data.length).toBe(161);
		});

		test("/adjectives/suffixes", async () => {
			const response = await request(server).get("/adjectives/suffixes");
			expect(response.statusCode).toBe(200);
			expect(response.body.data).toContain("ed");
			expect(response.body.data.length).toBe(15);
		});
		test("/adjectives/suffixes?flat=true", async () => {
			const response = await request(server).get("/adjectives/suffixes?flat=true");
			expect(response.statusCode).toBe(200);
			expect(response.body.data).toContain("ed");
			expect(response.body.data.length).toBe(23);
		});
	});

	describe("unhappy", () => {
		test("bad limit", async () => {
			const response = await request(server).get("/adjectives?limit=a");
			expect(response.statusCode).toBe(500);
		});
	});

});
