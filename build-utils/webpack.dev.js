const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // Supports dotenv and other environment variables
    new Dotenv({
      path: './.env.development',
    }),
  ],
  output: {
    filename: 'bundle.[hash].js',
  },
  devServer: {
    contentBase: './dist',
    host: HOST,
    port: PORT,
    // https://github.com/bripkens/connect-history-api-fallback
    // https://github.com/webpack/webpack-dev-server/tree/master/examples/cli/history-api-fallback
    // Enables History API Fallback support for applications that are using the HTML 5 history API.
    // Effectively asking the server to fallback to index.html (default)
    // in the event that a requested resource cannot be found.
    // For our SPA app we can config the Router to handle it.
    historyApiFallback: true,
    hot: true,
  },
};
