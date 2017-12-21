const webpack = require('webpack');
const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");

module.exports = merge(baseConfig, {
	plugins: [
		new webpack.DefinePlugin({
			"API_URL": '"http://danigarcia-dev.com:10002/api"',
			"NODE_ENV": "local"
		})
	]
});
