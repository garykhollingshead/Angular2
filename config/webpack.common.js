const webpack = require('webpack');
const helpers = require('./helpers');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = function (options) {
  isProd = options.env === 'production';
  return {
    entry: {
      'polyfills': './src/polyfills.browser.ts',
      'vendor': './src/vendor.browser.ts',
      'main': './src/main.browser.ts'
    },
    output: {
      path: helpers.root('dist'),
      filename: '[name].js',
      sourceMapFilename: '[name].map'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      // An array of directory names to be resolved to the current directory
      modules: [helpers.root('src'), helpers.root('node_modules')]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            'awesome-typescript-loader',
            'angular2-template-loader',
            'angular2-router-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ["raw-loader", "sass-loader"]
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          use: 'file-loader'
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {from: 'src/assets/icon', to: 'assets/icon'},
        {from: 'src/assets/fonts', to: 'assets/fonts'},
        {from: 'src/assets/img', to: 'assets/img'},
        {from: 'src/index.html', to: './'}
      ]),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        __dirname
      )
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
};
