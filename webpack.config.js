const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
           "React": "react",
           "ReactDOM": "react-dom",
           "propTypes": "prop-types"
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