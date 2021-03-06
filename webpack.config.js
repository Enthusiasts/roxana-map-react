/**
 * Created by debal on 12.03.2016.
 */
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        "./src/app.js"
    ],
    output: {
        path: path.join(__dirname, 'public/scripts/build'),
        publicPath: "/scripts/build/",
        filename: "bundle.wp.js"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                include: path.join(__dirname, 'src'),
                loaders: ["react-hot", "babel?presets[]=react,presets[]=es2015,plugins[]=transform-object-rest-spread"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};