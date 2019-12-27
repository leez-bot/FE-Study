const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  // output: 'bundle.js',
  module: {
    rules: [
      { test: /\.css$/, use: [ "style-loader", "css-loader" ] },
      { test: /\.jsx?$/, use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }, exclude: /(node_modules|bower_components)/, },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      join: ['lodash', 'join']
    })
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1
        }
      }
    },
    // 老版本缓存配置(manifest)，解决代码没变更，hash发生改变问题，将manifest映射关系提炼出来
    runtimeChunk: {
      name: entrypoint => `manifest.${entrypoint.name}`
    }
  }
}
