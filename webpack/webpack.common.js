const commonPaths = require('./common-paths');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const config = {
  target: 'web',
  entry: {
    bundle: './src/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      images: path.resolve(__dirname, '../assets/images'),
      fonts: path.resolve(__dirname, '../assets/fonts')
    }
  },
  output: {
    filename: 'static/js/[name].[hash].js',
    path: commonPaths.outputPath,
    chunkFilename: "static/js/[name].chunk.js",
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CopyWebpackPlugin({patterns: [{ from: 'public' }]}, {
      ignore: ['*.html']
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: ['/node_modules/']
      },
      {
        test: /\.[tj]s(x?)$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true
            }
          }
        ],
        exclude: ['/node_modules/'],
        include: [
          commonPaths.srcPath,
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;