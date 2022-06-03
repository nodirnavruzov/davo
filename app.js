var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var helmet = require('helmet');
const sequelize = require('./db/connection');
var routes = require('./routes/index');
var cors = require('cors')
const logger = require('./utils/logger')
var app = express();


app.use(logger('myformat'))
app.use(cors())
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

sequelize.authenticate().then( () => {
  console.log('Connection to Database has been established successfully.');
}).catch(error => {
  throw new Error('Unable to connect to the database:' + error) 
})

app.use('/api/v1', routes);


app.use('/', (req, res) => {
  res.json({message: 'Have you lost anything?'})
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(404).json({error: err.message})
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
