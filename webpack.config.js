const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: "/\.s?css$/",
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: "/\.(woff|woff2|ttf|eot|svg)$/",
        include: [
          path.resolve(__dirname, 'src/fonts'),
        ],
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: path.resolve(__dirname, 'assets/image')
          }
        }
      },
      {
        test: "/\.(png|jpg|jpeg|svg|gif)$/",
        exclude: [
          path.resolve(__dirname, 'src/fonts'),
        ],
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: path.resolve(__dirname, 'assets/image')
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
};