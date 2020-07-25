const commonPaths = require('./common-paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 4200;
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || 'localhost';

const cssLoaders = [
  {
    loader: 'style-loader',
  },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: {
        mode: 'local',
        localIdentName: '[name]_[local]_[hash:base64:5]',
      },
      localsConvention: 'camelCase',
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        require('autoprefixer')({
          overrideBrowserslist: ['last 2 versions', 'ie >= 9'],
        }),
      ],
    },
  },
];

module.exports = {
  devtool: 'inline-source-map',
  output: {
    pathinfo: true,
  },
  devServer: {
    hot: true,
    contentBase: commonPaths.contentBasePath,
    publicPath: '/',
    host: host,
    https: protocol === 'https',
    port: DEFAULT_PORT,
    disableHostCheck: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: commonPaths.contentBasePath + '/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BUILD_VERSION': JSON.stringify(process.env.BUILD_NUMBER || 'DEV'),
    }),
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: 'source-map-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        exclude: [/node_modules/],
        include: commonPaths.srcPath,
        use: [...cssLoaders, { loader: 'sass-loader' }],
      },
    ],
  },
};