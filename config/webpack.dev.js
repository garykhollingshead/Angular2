const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const appConfig = {
  "ApiHost": JSON.stringify("http://localhost"),
  "IndigoUiAssets": JSON.stringify("http://localhost:3000/static/js"),
  "CatalogApiRoot": JSON.stringify("/catalogs/api"),
  "ProgramApiRoot": JSON.stringify("/programs/api"),
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
  return webpackMerge(commonConfig({env: ENV, appConfig: appConfig}), {
    devtool: 'cheap-module-source-map',

    plugins: [
      new DefinePlugin({
        "ApiHost": METADATA.appConfig.ApiHost,
        "IndigoUiAssets": METADATA.appConfig.IndigoUiAssets,
        "CatalogApiRoot": METADATA.appConfig.CatalogApiRoot,
        "ProgramApiRoot": METADATA.appConfig.ProgramApiRoot,
        "TemplateApiRoot": METADATA.appConfig.TemplateApiRoot,
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV)
        }
      })
    ],
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  });
};
