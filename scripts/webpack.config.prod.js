var path = require('path')
var webpack = require('webpack')
var ModernizrWebpackPlugin = require('modernizr-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
    // new ModernizrWebpackPlugin(
    //   {
    //     'feature-detects': [
    //       'geolocation'
    //     ]
    //   }
    // )
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react'],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, '../src'),
      }
      // { test: /\.css$/, loader: 'css-loader' },
      // { test: /\.scss$/, include: /client/, loaders: [ 'style', 'css', 'sass' ] }
    ]
  }
}
