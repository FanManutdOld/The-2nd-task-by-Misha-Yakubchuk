const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
// const isProd = !isDev;

let PAGES_NAME; const PAGES_DIR = [];

const createEntryPoints = () => {
  const entryPoints = {};

  const uiKitPath = path.resolve(__dirname, 'src/pages/ui-kit');
  const uiKitPagesName = fs.readdirSync(uiKitPath);
  uiKitPagesName.forEach((pageName) => {
    PAGES_DIR.push(path.resolve(__dirname, `src/pages/ui-kit/${pageName}`));
  });
  PAGES_NAME = uiKitPagesName;
  uiKitPagesName.forEach((pageName) => {
    entryPoints[pageName] = path.join(uiKitPath, `/${pageName}/index.js`);
  });

  const webPagesPath = path.resolve(__dirname, 'src/pages/websitePages');
  const webPagesName = fs.readdirSync(webPagesPath);
  webPagesName.forEach((item) => {
    PAGES_DIR.push(path.resolve(__dirname, `src/pages/websitePages/${item}`));
  });
  PAGES_NAME = PAGES_NAME.concat(webPagesName);
  webPagesName.forEach((pageName) => {
    entryPoints[pageName] = path.join(webPagesPath, `/${pageName}/index.js`);
  });

  return entryPoints;
};

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  entry: createEntryPoints(),
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: isDev ? 'source-map' : '',
  /* splitChunks: {
    chunks: 'all',
  }, */
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
    ...PAGES_NAME.map((pageName, i) => new HtmlWebpackPlugin({
      filename: `${pageName}.html`,
      template: `${PAGES_DIR[i]}/${pageName}.pug`,
      chunks: [pageName],
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
