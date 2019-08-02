const { randomSelection } = require("../utils");

// see the problem? CVoverage reports 100% lines in "utils.js" is covered,
// but we didn't even scratched the surface with all possibilities
// and edge cases. I.e. we do not know if the function works as expected :(

describe("Test tutils", () => {
	const data = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

	describe("happy", () => {
		test("sanity test", () => {
			const res = randomSelection(data, 5);
			expect(res.length).toBe(5);
		});
		test("default limit", () => {
			const res = randomSelection(data);
			expect(res.length).toBe(1);
		});
		test("default limit", () => {
			const res = randomSelection(data, 155);
			expect(res.length).toBe(data.length);
		});
	});

	describe("unhappy", () => {
		test("non-integer limit", () => {
			expect(() => { randomSelection(data, "a"); }).toThrow();
		});
		test("negative limit", () => {
			expect(() => { randomSelection(data, -5); }).toThrow();
		});
		test("non-array data", () => {
			expect(() => { randomSelection(123, 5); }).toThrow();
		});
		test("non-array data #2", () => {
			expect(() => { randomSelection("abc", 5); }).toThrow();
		});
	});
});
