const { randomSelection } = require("../utils");

// see the problem? CVoverage reports 100% lines in "utils.js" is covered,
// but we didn't even scratched the surface with all possibilities
// and edge cases. I.e. we do not know if the function works as expected :(

describe("Test tutils", () => {
	const data = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

	test("randomSelection", async () => {
		const res = randomSelection(data, 5);
		expect(res.length).toBe(5);
	});
});
