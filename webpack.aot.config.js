var webpack = require('webpack');
var path = require("path");
var ngToolsWebpack = require("@ngtools/webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
const DefinePlugin = require('webpack/lib/DefinePlugin');

const appEnvironment = process.env.APP_ENVIRONMENT || "development";
var isProduction = appEnvironment === "production";

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const appConfig = {
  "CatalogApiUrl": JSON.stringify("https://localhost/catalogs/api"),
  "ProgramApiUrl": JSON.stringify("https://localhost/programs/api"),
  "AuthServerUrl": JSON.stringify("https://localhost/auth")
};
const METADATA = {
  host: HOST,
  port: PORT,
  ENV: appEnvironment,
  appConfig: appConfig
};

var webpackConfig = {
  entry: {
    'polyfill': './src/polyfills.ts',
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
        test: /\.css$/,
        include: path.resolve(process.cwd(), "src", "app"),
        loaders: ["to-string-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["raw-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        exclude: path.resolve(process.cwd(), 'src', 'app'),
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      { test: /\.html$/,  loaders: ['raw-loader'] },
      { test: /\.ts$/, loaders: ["awesome-typescript-loader", "angular2-template-loader"]}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Reflect: 'core-js/es7/reflect'
    }),
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
    )
  ],
  stats: "errors-only",
  devtool: "source-map",
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
if (isProduction){
  webpackConfig.plugins.push(new ngToolsWebpack.AotPlugin({
    tsConfigPath: "../tsconfig.json",
    entryModule: "../src/app/app.module#AppModule"
  }));
}

module.exports = webpackConfig;
