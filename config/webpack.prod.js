const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const appConfig = {
  "IndigoUiAssets": JSON.stringify("http://localhost/testt/static/js"),
  "CatalogApiUrl": JSON.stringify("http://localhost/catalogs/api"),
  "ProgramApiUrl": JSON.stringify("http://localhost/programs/api"),
  "AuthServerUrl": JSON.stringify("http://localhost/auth"),
  "TemplateApiRoot": JSON.stringify("/EmailTemplateApi")
};

const METADATA = webpackMerge(commonConfig({
  env: ENV,
  appConfig: appConfig
}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  appConfig: appConfig
});

module.exports = function () {
  return webpackMerge(commonConfig({env: ENV}), {
    devtool: 'source-map',
    plugins: [
      new DefinePlugin({
        "IndigoUiAssets": METADATA.appConfig.IndigoUiAssets,
        "CatalogApiUrl": METADATA.appConfig.CatalogApiUrl,
        "ProgramApiUrl": METADATA.appConfig.ProgramApiUrl,
        "AuthServerUrl": METADATA.appConfig.AuthServerUrl,
        "TemplateApiRoot": METADATA.appConfig.TemplateApiRoot,
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV)
        }
      }),
      new UglifyJsPlugin({
        beautify: false,
        output: {
          comments: false
        },
        mangle: {
          screw_ie8: true
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false
        }
      }),
      new LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })

    ],

    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
};
