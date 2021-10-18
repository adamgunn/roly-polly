const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.ProvidePlugin({
           "React": "react"
        }),
     ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};