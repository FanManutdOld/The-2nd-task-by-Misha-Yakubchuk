const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

let pages;

const createEntryPoints = () => {
  const uiKitPath = path.resolve(__dirname, 'src/pages/ui-kit');
  pages = fs.readdirSync(uiKitPath).map((pageName) => ({
    pageName,
    pageDir: path.resolve(__dirname, `src/pages/ui-kit/${pageName}`),
    entryPoint: path.join(__dirname, `src/pages/ui-kit/${pageName}/index.js`),
  }));

  const webPagesPath = path.resolve(__dirname, 'src/pages/websitePages');
  pages = pages.concat(fs.readdirSync(webPagesPath).map((pageName) => ({
    pageName,
    pageDir: path.resolve(__dirname, `src/pages/websitePages/${pageName}`),
    entryPoint: path.join(__dirname, `src/pages/websitePages/${pageName}/index.js`),
  })));

  const entryPoints = {};
  pages.forEach((item) => {
    entryPoints[item.pageName] = item.entryPoint;
  });

  return entryPoints;
};

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  entry: createEntryPoints(),
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
    ...pages.map((item) => new HtmlWebpackPlugin({
      filename: `${item.pageName}.html`,
      template: `${item.pageDir}/${item.pageName}.pug`,
      chunks: [item.pageName],
    })),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
