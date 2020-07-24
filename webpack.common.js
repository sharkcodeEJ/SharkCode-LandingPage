const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    entry: "./public/js/carrousel.js",
    // entry : "./script-compiled.js",

    plugins: [
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },


        ]

    }
}