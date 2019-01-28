var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://mehdi:mehdi@51.75.254.172:27017/ptut2018', { useNewUrlParser: true });

var companyRouter = require('./routes/company');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Listen on port
app.listen(1234);

// Use '/api' as the route prefix
app.use('/companies', companyRouter);

module.exports = app;