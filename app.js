var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

////////////////////////////////////////////////////////////
// ROUTING
////////////////////////////////////////////////////////////

// Setup MySQL admin routes
// This will take the route /myadmin away from you!!!
var mysqlAdmin = require('node-mysql-admin');
app.use(mysqlAdmin(app));

// Setup your own routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var routingExerciseRouter = require('./routes/exercises/routing');
var exerciseRouter = require('./routes/exercises/index');
var mysqlRouter = require('./public/examples/mysql/router');
var lab9Router = require('./public/labs/9/router');
var lab10Router = require('./public/labs/10/router');

app.use('/', indexRouter);
app.use('/mysql', mysqlRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/exercises/routing', routingExerciseRouter);
app.use('/exercises', exerciseRouter);
app.use('/lab/9', lab9Router);
app.use('/lab/10', lab10Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
