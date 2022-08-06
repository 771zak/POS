module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
		},
	},
	pages: {
		index: "src/main.js",
		receipt_page: "src/receiptPage/main.js",
	},
};
