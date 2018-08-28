const path = require("path")
const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 8080
		// proxy: {
		// 	'/static': {
		// 		target: 'http://localhost:3001', 
		// 		secure: false
		// 		// pathRewrite: {'^/static' : ''}
		// 		// bypass: function(req, res, proxyOptions) {
		// 		//   	if (req.accepts('html')) {
		// 		//     	console.log('Skipping proxy for browser request.')
		// 		//     	return '/index.html'
		// 		//   	}
		// 		// }
		// 	}
		// }
	},
	externals: {
	  	'config': JSON.stringify(require('./config/config.dev.json'))
	}
});