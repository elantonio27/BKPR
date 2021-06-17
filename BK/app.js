'use strict';//new mode due to security problems
var debug = require('debug');
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var nanoid = require('nanoid');
//var uuid = require('uuid');
var routes = require('./routes/index');
var drinklist = require('./routes/drinklist');
var tische = require('./routes/tische');
var cors = require('cors');
var longdrinklist = require('./routes/longdrinklist');
var beerlist = require('./routes/beerlist');
var shotlist = require('./routes/shotlist');
var sendDB = require('./routes/sendDB');
var db = require('./util/db'); 




//neu
var app = express(); //vaidate express functions
db.connect();//call method to create the database 
db.initTables();//call method to create the tables 



//connect to DB SQLite3


// view engine setup and usual standard settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//this segment directs the rooting
app.use('/', routes);
app.use('/drinklist', drinklist);
app.use('/tische', tische);
app.use('/longdrinklist', longdrinklist);
app.use('/beerlist', beerlist);
app.use('/shotlist', shotlist);
app.use('/sendDB', sendDB);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 1337);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
