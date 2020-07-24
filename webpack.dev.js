const common = require('./webpack.common')
const {merge} = require('webpack-merge');
const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common,{
    mode :"development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({template : path.resolve(__dirname,"index.html")}),
    ],
    module: {
        rules: [
            {
                test: /\.(jpg|svg|png|gif)/,
                use: [{
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "imgs"
                        }
                    } 
                ]
            
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
        ]
    }
});