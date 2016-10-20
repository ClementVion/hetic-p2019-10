var webpack = require("webpack");

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
  		preLoaders: [
      		{
	        	test: /\.js$/,
	        	exclude: /node_modules/,
	        	loader: 'jshint-loader'
	      }
	   ],
        loaders: [
            { 
            	test: /\.scss$/, 
	        	loaders: ["style", "css", "sass"] },
             {
		       test: /\.es6$/,
		       exclude: /node_modules/,
		       loader: 'babel-loader',
		       query: {
		         presets: ['es2015'] 
		       }
		     }
		   ]
		 },
 	resolve: {
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