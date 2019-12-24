const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true, // 开发环境配置tree shaking;生产环境默认有此功能
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    hotOnly: true
  },
  mode: 'development'
})