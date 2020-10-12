const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

/* let bufPages; let dirNames = []; let PAGES; const PAGES_DIRS = [];
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
PAGES = PAGES.concat(dirNames); */
const PAGES_DIR = path.resolve(__dirname, 'src/pages/ui-kit/headers-footers');
const PAGES_DIR1 = path.resolve(__dirname, 'src/pages/ui-kit/form-elements');

module.exports = {
  entry: {
    'headers-footers': './src/pages/ui-kit/headers-footers/index.js',
    'form-elements': './src/pages/ui-kit/form-elements/index.js',
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: isDev ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      grid: true,
                    },
                  ],
                  'cssnano',
                ],
              },
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
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
    new HtmlWebpackPlugin({
      filename: 'headers-footers.html',
      template: `${PAGES_DIR}/headers-footers.pug`,
      chunks: ['headers-footers'],
    }),
    new HtmlWebpackPlugin({
      filename: 'form-elements.html',
      template: `${PAGES_DIR1}/form-elements.pug`,
      chunks: ['form-elements'],
      // inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
