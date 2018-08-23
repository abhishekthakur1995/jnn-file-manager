const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: {
		vendor: ["react", "react-dom", "react-bootstrap", "react-chartjs-2"],
		app:
		[
			"./src/index.js",
			"./src/components/App.js",
			"./src/components/NavBar.js",
			"./src/components/SideBar.js",
			"./src/components/EntryForm.js",
			"./src/components/LoginForm.js",
			"./src/components/ErrorPage.js",
			"./src/components/Dashboard.js",
			"./src/components/InfoBoard.js",
			"./src/components/RecordList.js",
			"./src/components/Record.js",
			"./src/components/uiComponents/AlertComponent.js",
			"./src/components/uiComponents/CommonComponent.js"
		],
	},
	output: {
		filename: "[name].bundle.js",
		path: path.join(__dirname, "dist"),
		publicPath: "/"
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 8080,
		proxy: {
			'/static': {
				target: 'http://localhost:3001', 
				secure: false
				// pathRewrite: {'^/static' : ''}
				// bypass: function(req, res, proxyOptions) {
				//   	if (req.accepts('html')) {
				//     	console.log('Skipping proxy for browser request.')
				//     	return '/index.html'
				//   	}
				// }
			}
		}
	},
	module: {
		rules: [
			{
		        enforce: "pre",
		        test: /\.js$/,
		        exclude: [
		        	/(node_modules)/,
		        	path.resolve(__dirname, 'src/registerServiceWorker.js')
	        	],
		        loader: "eslint-loader",
	      	},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env", "stage-0", "react"],
					}
				}
			},
			{
				test: /\.css$/,
				exclude: /(node_modules)/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"}
				]
			},
			{
				test: /\.scss$/,
				exclude: /(node_modules)/,
				use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader'],
                })
			},
			{
				test: /\.woff($|\?)|\.woff2($|\?)|\.png($|\?)|\.ttf($|\?)|\.eot($|\?)|\.jpg($|\?)|\.svg($|\?)/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							name: 'public/img/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'])
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.bundle.js"
		}),
		new HTMLWebpackPlugin({
      		title: 'File Manager',
      		filename: 'index.html',
      		template: 'public/index.html'
    	}),
    	new ExtractTextPlugin({
    		filename:'app.bundle.css'
    	}),
	],
	externals: {
	  	'config': JSON.stringify(require('./config.dev.json'))
	}
}