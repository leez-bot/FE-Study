const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./dll/venders.manifest.json'),
    //   name: './dll/venders.dll.js'
    // }),
    new AddAssetHtmlPlugin({ filepath: require.resolve('./dll/venders.dll.js') })
  ]
})