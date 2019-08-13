module.exports = shipit => {
	require("shipit-deploy")(shipit);
	shipit.initConfig({
		default: {
			deployTo: "/var/apps/lists",
			repositoryUrl: "git@github.com:nmakarov/lists.git",
			key: "~/.ssh/terraform_rsa"
		},
		production: {
			servers: "ubuntu@api.lists.expertbasics.com"
			// servers: "ubuntu@lists.expertbasics.com"
		}
	});

	shipit.on("deployed", () => {
		// const env = shipit.environment;

		const cmd = `
			cd ${shipit.releasePath} && \
			npm install --production && \
			pm2 delete api; \
			NODE_ENV=production pm2 start api
		`;

		shipit.remote(cmd);
	});
};
