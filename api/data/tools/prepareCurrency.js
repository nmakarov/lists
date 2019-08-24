const { list, supported } = require("../currecnySrc");
let s = supported;
// console.info(list);

console.info("module.exports = [");

let c = list.pop();
while (c) {
	const [ symbol, code, name, country ] = c;
	const supported = s.includes(symbol);
	const res = {
		symbol, code, name: name.toLowerCase(), country: country.toLowerCase(), supported
	}
	if (supported) {
		s = s.filter(c => c !== symbol);

	}
	console.info(`${JSON.stringify(res)},`);
	c = list.pop();
}
console.info("];");

// console.info(">> remaining supported:", s);
