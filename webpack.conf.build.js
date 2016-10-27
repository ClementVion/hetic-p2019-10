var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: "./entry.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: '/static/',
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
            test: /\.html$/,
            loader: "html-loader"
          },
          { 
          	test: /\.scss$/, 
	        	loader: ExtractTextPlugin.extract("style","css?minimize!sass"),
          },
          {
		        test: /\.es6$/,
		        exclude: /node_modules/,
		        loader: 'babel-loader',
		        query: {
              presets: ['es2015'] 
		        }
		      },
          {
            test: /\.(jpg|png)$/,
            loaders: ['file?hash=sha512&digest=hex&name=./imgs/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'],
            include: __dirname+"/assets/img"
          },
          {
           test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' 
          }
        ]
		  },
      plugins : 
      [
        new ExtractTextPlugin("./static/css/app.css")
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
