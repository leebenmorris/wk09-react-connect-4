const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs', 'js'),
    publicPath: '/'
  },
  // use the follwoing for production
  devtool: 'cheap-module-source-map',
  // devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],

      },
      {
        test: /\.(jpe?g|png)$/,
        loader: 'url-loader'
      }
    ]
  },
  // use the following plugin for production
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
    publicPath: '/js/',
    port: 3000
  }
};