const { createConfig, env, entryPoint, setOutput, sourceMaps, customConfig } = require('@webpack-blocks/webpack')
const babel = require('@webpack-blocks/babel6')
const devServer = require('@webpack-blocks/dev-server')
const postcss = require('@webpack-blocks/postcss')
const sass = require('@webpack-blocks/sass')
const autoprefixer = require('autoprefixer')

module.exports = createConfig([
  entryPoint('./entry.js'),
  setOutput('./dist/bundle.js'),
  sass(),
  babel(),
  postcss([
    autoprefixer({ browsers: ['last 2 versions'] })
  ]),
  env('development', [
    devServer(),
    devServer.proxy({
      '/api': { target: 'http://localhost:3000' }
    }),
    sourceMaps()
  ]),
  customConfig({
    module: {
      loaders: [
        {
            test: /\.html$/,
            loader: "mustache"
        },
        {
            test: /\.json$/,
            loader: "json"
        },
      ]
    }
  })
])
