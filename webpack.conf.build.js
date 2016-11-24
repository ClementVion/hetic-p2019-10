var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: ['babel-polyfill', './entry.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: './static/',
},
  module: 
  {
		preLoaders: 
    [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }
    ],
    loaders: 
      [
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
      // {
      //   test: /\.html$/,
      //   loader: ExtractTextPlugin.extract("html-loader"),
      // },
        //   { 
        //   	test: /\.scss$/, 
	       //  	loader: ExtractTextPlugin.extract("style","css?minimize!sass"),
        //   },
      {
        test: /\.es6\.js$/, loader: "babel",
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ['es2015'],
        }
      },
          {
            test: /\.(jpg|png)$/,
            loaders: ['file-loader?emitFile=false&name=[path][name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'],
          }
        ]
		  },
      plugins : 
      [
        new ExtractTextPlugin("./static/css/app.css"),
        new ExtractTextPlugin("./static/html/[name].html")

      ],
 	    resolve: 
      {
        extensions: ['', '.js', '.es6']
      },
    devServer: {
    	open: true,
	    plugins: [
			new webpack.HotModuleReplacementPlugin()
		],
    	colors: true,
    	progress: true,
    },
}