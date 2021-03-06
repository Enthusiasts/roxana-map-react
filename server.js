var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var open = require('open');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    progress: true,
    //colors: true,
    contentBase: "public",
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/spring/*': {
            target: "http://127.0.0.1:8090",
            secure: false,
            xfwd: true
        },
        '/routes/*': {
            target: "http://127.0.0.1:8090",
            secure: false,
            xfwd: true
        },
        '/entertainments/*': {
            target: "http://127.0.0.1:8090",
            secure: false,
            xfwd: true
        },
        '/login/*': {
            target: "http://127.0.0.1:8090",
            secure: false,
            xfwd: true
        },
        '/user/*': {
            target: "http://127.0.0.1:8090",
            secure: false,
            xfwd: true
        }
    }
});

server.listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
});

open('http://127.0.0.1:3000/');