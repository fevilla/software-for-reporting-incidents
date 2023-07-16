var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const createError = require('http-errors');
const cors = require("cors");
const fileUpload = require('express-fileupload');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(logger('dev'));
app.set('views', './views');
app.set('view engine', 'pug')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/incident/javascripts', express.static(__dirname + '/public/javascripts'));
//app.use('/incidents/', express.static(__dirname + '/public/javascripts'));
// view engine setup
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/images/" }));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
