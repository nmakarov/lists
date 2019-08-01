const randomSelection = (data, limit) => {
	const l = data.length;
	const tmp = Array.from(new Array(l).keys());
	for (let i = 0; i < limit; i++) {
		const r = Math.floor(Math.random() * l);
		[tmp[i], tmp[r]] = [tmp[r], tmp[i]];
	}
	return tmp.slice(0, limit).map($ => data[$]);
};

module.exports = {
	randomSelection,
};
