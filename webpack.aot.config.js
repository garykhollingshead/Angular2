var webpack = require('webpack');
var path = require("path");
var ngToolsWebpack = require("@ngtools/webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const appConfig = {
  "CatalogApiUrl": JSON.stringify("https://localhost/catalogs/api"),
  "ProgramApiUrl": JSON.stringify("https://localhost/programs/api"),
  "AuthServerUrl": JSON.stringify("https://localhost/auth")
};

var webpackConfig = {
  entry: {
    'app': './src/main.aot.ts'
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: "[name].js"
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(process.cwd(), 'src')
    ],
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.(jpg|jpeg|gif|png)$/, loader:'file-loader?name=img/[path][name].[ext]' },
      { test: /\.(eof|woff|woff2|svg)$/, loader:'file-loader?name=img/[path][name].[ext]' },
      {
        test: /\.scss$/,
        loaders: ["raw-loader", "sass-loader"]
      },
      { test: /\.css$/, loader: "raw-loader"},
      { test: /\.html$/,  loaders: ['raw-loader'] },
      { test: /\.ts$/, loaders: ["@ngtools/webpack"]}
    ]
  },
  plugins: [
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: "./tsconfig.json"
    }),
    new webpack.ProvidePlugin({
      Reflect: 'core-js/es7/reflect'
    }),
    new DefinePlugin({
      "CatalogApiUrl": appConfig.CatalogApiUrl,
      "ProgramApiUrl": appConfig.ProgramApiUrl,
      "AuthServerUrl": appConfig.AuthServerUrl
    }),
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin([
      {from: 'src/assets/icon', to: 'assets/icon'},
      {from: 'src/assets/fonts', to: 'assets/fonts'},
      {from: 'src/assets/img', to: 'assets/img'},
      {from: 'src/index.html', to: './'}
    ]),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.join(process.cwd(), "./src")
    ),
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
  stats: "errors-only",
  devServer: {
    contentBase: './src',
    port: 3000,
    inline: true,
    historyApiFallback: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500
    }
  }

};

module.exports = webpackConfig;
