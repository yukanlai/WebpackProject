const express = require('express');

const app = express();  // Express app

// Server routes...

if(process.env.NODE_ENV !== 'production'){
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');  // library
    const webpackConfig = require('./webpack.config.js');

    app.use(webpackMiddleware(webpack(webpackConfig)));
}else{
    // tell express that it should make everything inside the dist directory freely available for use to anyone who asked for it
    app.use(express.static('dist'));
    // use specifically for compability with React-Router, specifically with browser history module
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

app.listen(process.env.PORT || 3050, () => console.log("Listening "));

