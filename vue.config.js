module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
	pages: {
		index: "src/main",
		receipt_page: "src/receipt_page/main.js",
	}
};
