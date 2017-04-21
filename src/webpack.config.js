var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, "js/app/index.js"),
	output: {
		path: path.join(__dirname, "../public"),
		filename: 'js/index.js'
	},
    module: {
        rules: [{
                test: /\.css$/,
                // use: [ "style-loader", "css-loader" ] // 作用相同
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            }]
    },
    resolve: {
        alias: {
            "jquery": path.join(__dirname, "./js/lib/jquery-1.12.4.min.js"),
            "css": path.join(__dirname, "css"),
            "mod": path.join(__dirname, "js/mod")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new ExtractTextPlugin("css/index.css")
    ]
};