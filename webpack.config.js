const webpack = require('webpack');
const path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.NODE_ENV;

const libraryName = 'maximndSimpleCarousel';
let outputFile = '';
let plugins = [];
console.log(env)
if (env === 'production') {
    plugins.push(new UglifyJsPlugin({ minimize: true, sourceMap: true }));
    outputFile = 'index.bundle.min.js';
} else {
    outputFile = 'index.bundle.js';
}

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: outputFile,
        publicPath: '/lib',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ],
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    plugins: plugins,
    devtool: 'source-map'
};