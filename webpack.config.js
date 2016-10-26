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
            test: /\.html$/,
            loader: "html-loader"
          },
          { 
          	test: /\.scss$/, 
	        	loaders: ["style", "css", "sass"] 
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
            loader: 'url?limit=25000',
            include: __dirname+"/assets/img"
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
