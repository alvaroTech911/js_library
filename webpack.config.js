// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPolyfillIOPlugin = require('html-webpack-polyfill-io-plugin');

module.exports = {
    // simple config from http://webpack.github.io/docs/configuration.html
    entry: "./src/index.js",
    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },
    // using webpack loader
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader", // or just "babel"
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },
    devtool: 'source-map',
    // plugins: [
    //   new HtmlWebpackPlugin(),
    //   new HtmlWebpackPolyfillIOPlugin({
    //     minify: true,
    //     features: [
    //       'Arrary.prototype.find',
    //       'Object.values',
    //       'Array.prorotype.filter',
    //       'Array.prototype.findIndex'
    //     ],
    //     flags: 'always',
    //     unkown: 'polyfill',
    //     callback: 'polyfillHasLoaded',
    //     rum: true
    //   })
    // ]
};
