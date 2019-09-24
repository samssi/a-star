const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/app.js",

    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
      },
      
    module: {
        rules: [
            { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
            { test: /\.css$/i, use: ['css-loader']}
        ]
    },
    
    plugins: [new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}