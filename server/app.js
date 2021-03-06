require('dotenv').config()
const express = require('express');
var cors = require('cors')
// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/movies')

//===================== mongoose =========

const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017");
mongoose.connect('mongodb://arief:08november@ds229621.mlab.com:29621/imdbtimes',{ useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to db')
});

//===================== mongoose =========

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('view engine', 'jade');

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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