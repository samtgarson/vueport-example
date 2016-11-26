// Example webpack configuration with asset fingerprinting in production.
'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


// must match config.webpack.dev_server.port
var devServerPort = 3808;

// set NODE_ENV=production on the environment to add asset fingerprints
var production = process.env.NODE_ENV === 'production';

var config = {
  entry: {
    // Sources are expected to live in $app_root/webpack
    'application': './webpack/application.js'
  },

  output: {
    // Build assets directly in to public/webpack/, let webpack know
    // that all webpacked assets start with webpack/

    // must match config.webpack.output_dir
    path: path.join(__dirname, '..', 'public', 'webpack'),
    publicPath: '/webpack/',

    filename: production ? '[name]-[chunkhash].js' : '[name].js'
  },

  resolve: {
    root: path.join(__dirname, '..', 'webpack'),
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules'), path.join(__dirname, '../app/'),],
    alias: {
      // Use the standalone build to compile our page at runtime
      'vue$': 'vue/dist/vue.common.js'
    }

  },

  plugins: [
    // must match config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    })],
    // Use the necessary loaders to process our components
    module: {
      loaders: [
        {
          test: /.vue$/,
          loader: 'vue'
        },
        {
          loaders: ['babel'],
          test: /.js$/,
          exclude: /node_modules/
        },
        {
          test: /.css$/,
          loader: production ? ExtractTextPlugin.extract('vue-style', 'css') : 'style!css',
          fallbackLoader: 'vue-style-loader'
        }
      ]
    },
    vue: {
      loaders: {
        css: production ? ExtractTextPlugin.extract('vue-style', "css") : 'style!css'
      }
    }

};

if (production) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("application.css")

  );
} else {
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  config.output.publicPath = '//localhost:' + devServerPort + '/webpack/';
  // Source maps
  config.devtool = '#eval-source-map';
}

module.exports = config;
