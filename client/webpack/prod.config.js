const webpack = require('webpack');
const merge = require("webpack-merge");
const path = require('path');
const baseConfig = require("./base.config.js");

module.exports = merge(baseConfig, {
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js',
		publicPath: './'
	},
	plugins: [
		new webpack.DefinePlugin({
			"API_URL": '"http://danigarcia-dev.com:10002/api"',
			"NODE_ENV": "prod",
			"SERVER_ROOT": "'/hattrick'"
		})
	]
});
