var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    path.join(__dirname, '../src/index.js')
  ],
  output: {
    path: path.join(__dirname, '../docs/scripts'),
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
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react'],
        exclude: /(node_modules)/,
        include: path.join(__dirname, '../src')
      },
      { test: /\.css?$/, loaders: [ 'style', 'raw' ], include: path.resolve(__dirname, '../') },
      { test: /\.scss$/, include: /src/, loaders: [ 'style', 'css', 'sass' ] }
    ]
  }
}
