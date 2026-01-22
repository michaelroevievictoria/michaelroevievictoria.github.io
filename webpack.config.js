const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, 'main.js'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],

  devServer: {
    static: {
      directory: __dirname,
    },
    port: 3000,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: ['index.html', '**/*.css'],
  },
};