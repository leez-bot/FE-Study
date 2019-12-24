const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    venders: ['react', 'react-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'dll'),
    library: '[name]_dll'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.join(__dirname, 'dll', '[name].manifest.json')
    })
  ]
}