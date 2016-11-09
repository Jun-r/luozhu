var config= require("./config");
var express= require("express");
var mongoose = require('mongoose')
var path = require('path');
var app = express();
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
//var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore  = require('connect-mongo')(session);
//var fs = require('fs')


app.set('views','./views');
app.set('view engine','jade');
app.locals.pretty = config.pretty;

app.use(bodyParser.urlencoded({extended:false}))
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
mongoose.connect(config.db)
app.locals.moment = require('moment')
app.use(session({
    secret: 'junr',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    saveUninitialized: false,
    resave: false,
    store: new mongoStore({
        //autoRemove: 'disabled', // Default
        url: config.db
    }),
}));
app.use(logger('dev'));
app.use(cookieParser());

// 静态资源请求路径
app.use(express.static(path.join(__dirname,"public/")));
app.listen(config.port);

console.log("服务器已经启动,端口是"+config.port);

require('./routes/index')(app)
require('./app/util/file')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.set('showStackError', true);
    app.use(logger(':method :url :status'));
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});*/


module.exports = app;



