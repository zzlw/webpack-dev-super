var webpack = require('webpack');
var path = require('path');
var publicPath = path.resolve(__dirname, '../public/');
var deps = require('../package.json').dependencies;

module.exports = {
    entry: {
        'react': Object.keys(deps)
    },
    output: {
        path: publicPath,
        filename: '[name].dll.js',
        library: '[name]_library',
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../public/[name]-manifest.json'),
            name: '[name]_library',
        }),
    ],
    debug: true
}