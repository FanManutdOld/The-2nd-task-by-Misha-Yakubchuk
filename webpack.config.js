const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

let bufPages; let dirNames = []; let PAGES; const PAGES_DIRS = [];
bufPages = path.resolve(__dirname, 'src/pages/ui-kit');
dirNames = fs.readdirSync(bufPages);
dirNames.forEach((item) => {
  PAGES_DIRS.push(path.resolve(__dirname, `src/pages/ui-kit/${item}`));
});
PAGES = dirNames;
bufPages = path.resolve(__dirname, 'src/pages/websitePages');
dirNames = fs.readdirSync(bufPages);
dirNames.forEach((item) => {
  PAGES_DIRS.push(path.resolve(__dirname, `src/pages/websitePages/${item}`));
});
PAGES = PAGES.concat(dirNames);

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            globals: 'asd',
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        include: [
          path.resolve(__dirname, 'src/fonts'),
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts',
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        exclude: [
          path.resolve(__dirname, 'src/fonts'),
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...PAGES.map((page, index) => new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: `${PAGES_DIRS[index]}/${page}.pug`,
    })),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
