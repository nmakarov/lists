module.exports = shipit => {
	require("shipit-deploy")(shipit);
	shipit.initConfig({
		default: {
			deployTo: "/var/apps/lists",
			repositoryUrl: "git@github.com:nmakarov/lists.git",
		},
		production: {
			servers: "ubuntu@lists.expertbasics.com"
		}
	});

	shipit.on("deployed", () => {
		const env = shipit.environment;
		const proc = "api";
		console.info(">>> deployed, env:", env);

		const cmd = `
			cd ${shipit.releasePath} &&
			npm install --production &&
			NODE_ENV=production pm2 restart ${proc} --name lists
		`;

		shipit.remote(cmd);
	});
};
