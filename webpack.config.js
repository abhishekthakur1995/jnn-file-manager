const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

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
		port: 8080
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
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"},
					{loader: "sass-loader"}
				]
			},
			{
				test: /\.woff($|\?)|\.woff2($|\?)|\.png($|\?)|\.ttf($|\?)|\.eot($|\?)|\.jpg($|\?)|\.svg($|\?)/,
				exclude: /(node_modules)/,
				use: [
					{loader: "url-loader"}
				]
			},
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.bundle.js"
		}),
		new HTMLWebpackPlugin({
      		title: 'File Manager',
      		filename: 'index.html',
      		template: 'public/index.html'
    	})
		//new UglifyJsPlugin()  // run when creating production build only.
	]
}