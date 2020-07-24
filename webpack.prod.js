const common = require('./webpack.common')
const {merge} = require('webpack-merge');
const path = require('path');


const OptimizeCssPlugin= require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common,{
    mode :"production",
    output: {
        filename: "main.[contentHash].js",
        path: path.resolve(__dirname, 'dist')
    },
    optimization:{
        minimizer:[new OptimizeCssPlugin(), new TerserPlugin() ]
    },
    plugins: [
        new HtmlWebpackPlugin({template : path.resolve(__dirname,"index.html"),
        minify :{
            removeAttributesQuotes :true,
           collapseWhiteSpace:true,
           removeComments: true
        },}),
        new MiniCssExtractPlugin({ filename: "[name].[contentHash].css"}),

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
                    } ,
                    {
                        loader: 'img-loader',
                        options: {
                        plugins: [
                            require('imagemin-gifsicle')({
                            interlaced: false
                            }),
                            require('imagemin-mozjpeg')({
                            progressive: true,
                            arithmetic: false
                            }),
                            require('imagemin-pngquant')({
                            floyd: 0.5,
                            speed: 2
                            }),
                            require('imagemin-svgo')({
                            plugins: [
                                { removeTitle: true },
                                { convertPathData: false }
                            ]
                            })
                        ]
                        }
                    }
                ]
            
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
        ]
    },
});
