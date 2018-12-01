const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
	plugins: [
		new webpack.DefinePlugin({
			"API_URL": '"https://hattrick-server.herokuapp.com/api"',
			"NODE_ENV": "dev",
			"SERVER_ROOT": "''"
		})
	]
});
