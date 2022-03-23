module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
	pages: {
		index: "src/main.js",
		receipt: "src/pages/receipt_page/main.js",
	}
};
