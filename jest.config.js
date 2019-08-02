module.exports = {
	rootDir: "./api",
	collectCoverage: true,
	coverageDirectory: '<rootDir>/../coverage',
	coverageThreshold: {
	  global: {
		branches: 50,
		functions: 50,
		lines: 50,
		statements: 50
	  }
	},
	testMatch: ["**/__tests__/**/*.js"]
  };
