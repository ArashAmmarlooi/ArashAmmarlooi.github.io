const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

// ... existing code ...
const devMode = process.env.NODE_ENV !== 'production';
const isProduction = process.env.NODE_ENV === 'production';
// GitHub Pages base path - change this to match your repository name
const publicPath = isProduction ? '/index.js/' : '/';
module.exports = {
  entry: [
    path.resolve(__dirname, "src", "index.jsx"),
  ],
  output: {
    path: path.resolve(__dirname + "/build"),
    publicPath: publicPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]___[hash:base64:5]'
              },
              sourceMap: true,
              importLoaders: 1,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ]
      },

      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: { minimize: true }
        }
      }
    ]
  },
  resolve: {
    extensions: [".*", ".js", ".jsx"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname + "/public", 'index.html'),
      base: publicPath
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname + "/src"),
    hot: true,
    historyApiFallback: {
      index: '/',
      disableDotRule: true,
    },
    port: 3000
  }
};