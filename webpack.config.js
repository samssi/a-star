const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html"
});

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },

    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: "babel-loader"
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [htmlPlugin]
}
