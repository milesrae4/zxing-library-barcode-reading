const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js', '.html', '.jpg', '.png'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: { loader: 'ts-loader' },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: true,
          toplevel: true,
        },
      }),
    ],
  },
};
