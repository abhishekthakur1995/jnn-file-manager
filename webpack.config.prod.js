const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')
const AppCachePlugin = require('appcache-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
	plugins: [
    	new CopyWebpackPlugin([{ 
    		from: './public/favicon.ico'
	  	}]),
		new BundleAnalyzerPlugin({
			analyzerMode: 'server'
		}),
		new CleanWebpackPlugin(['dist']),
    	new AppCachePlugin({
    		exclude: ['.htaccess']
    	}),
    	new UglifyJsPlugin()
	],
	externals: {
	  	'config': JSON.stringify(require('./config/config.prod.json'))
	}
})