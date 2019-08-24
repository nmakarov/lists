/* eslint-disable no-console */

const { list, supported } = require("../currecnySrc");

let s = supported;
// console.info(list);

console.info("module.exports = [");

let c = list.pop();
while (c) {
	const [symbol, code, name, country] = c;
	const supp = s.includes(symbol);
	const res = {
		symbol, code, name: name.toLowerCase(), country: country.toLowerCase(), supported: supp,
	};
	if (supp) {
		s = s.filter($ => $ !== symbol);
	}
	console.info(`${JSON.stringify(res)},`);
	c = list.pop();
}
console.info("];");

// console.info(">> remaining supp:", s);
