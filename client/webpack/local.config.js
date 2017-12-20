const webpack = require('webpack');
const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");

module.exports = merge(baseConfig, {
	plugins: [
		new webpack.DefinePlugin({
			"API_URL": '"http://192.168.0.175:10002/api"',
			"NODE_ENV": "local"
		})
	]
});
