const webpack = require("webpack")
const path = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	entry: {
		vendor: 
		[
			"axios",
			"lodash/core",
			"lodash.omit",
			"pdfmake/build/pdfmake", 
			"pdfmake/build/vfs_fonts", 
			"react", 
			"react-dom",
			"react-bootstrap",
			"react-router",
			"react-router-bootstrap/lib",
			"react-chartjs-2",
			"react-csv",
			"react-icons/fa",
			"react-breadcrumbs-dynamic", 
			"react-datepicker",
			"validator",
			"react-validation/build/form",
			"react-validation/build/input",
			"react-validation/build/button",
			"react-validation/build/select",
			"react-validation/build/textarea",
		],
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
			"./src/components/GetRecords.js",
			"./src/components/uiComponents/AlertComponent.js",
			"./src/components/uiComponents/CommonComponent.js",
			"./src/components/uiComponents/PaginationComponent.js",
			"./src/components/uiComponents/FilterComponent.js",
			"./src/components/uiComponents/CustomBreadCrumbsComponent.js"
		],
	},
	output: {
		filename: "[name].bundle.js",
		path: path.join(__dirname, "dist"),
		publicPath: "/"
	},
	module: {
		rules: [
			{
		        enforce: "pre",
		        test: /\.js$/,
		        exclude: /(node_modules)/,
		        loader: "eslint-loader"
	      	},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env", "stage-0", "react"]
					}
				}
			},
			{
				test: /\.css$/,
				include : [
					path.resolve(__dirname, "src"),
				    path.resolve(__dirname, "node_modules/react-datepicker/dist")
				],
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
                    use:['css-loader','sass-loader']
                })
			},
			{
	            test: /\.(png|jp(e*)g|svg|gif)$/,
	            exclude: /(node_modules)/,
	            use: [{
	                loader: 'url-loader',
	                options: {
	                    limit: 8196,
	                    name: 'public/img/[name].[ext]',
	                    fallback: 'file-loader'
	                }
	            }]
	        }
		]
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'server'
		}),
		new HTMLWebpackPlugin({
      		title: 'File Manager',
      		filename: 'index.html',
      		template: 'public/index.html'
    	}),
    	new ExtractTextPlugin({
    		filename:'app.bundle.css'
    	}),
    	new webpack.optimize.CommonsChunkPlugin({
    		name: "vendor",
    		filename: "vendor.bundle.js"
    	})
	]
}