const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill','./src/js/index.js'],
    /*polyfill deals with the problem of code from ES6 that cannot be converted to ES5*/
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })    
    ],
    module:{
        rules:[
            {
                test: /\.js$/,     
                exclude: /node_modules/,
                    use:{
                        loader: 'babel-loader' 
                    }
            }
        ]
    }
};

