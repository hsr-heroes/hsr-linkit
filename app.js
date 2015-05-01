var express = require('express'),
    path = require('path'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    moment = require('moment');

var routes = require('./routes/index');
var linkit = require('./routes/linkit');
var links = require('./routes/links');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret           : 'linkitSecret',
  saveUninitialized: false,
  resave           : false,
  cookie           : {maxAge: 60000}
}));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = moment;

// "Database" for our links
var db = [
  {
    id    : 1,
    title : "Lorem ipsum",
    url   : "http://9gag.org",
    author: "johndoe",
    date  : moment("2015-04-17T14:00:00.000Z").format(),
    votes : 10
  },
  {
    id    : 2,
    title : "Lorem ipsum 2",
    url   : "http://google.ch",
    author: "johndoe",
    date  : moment("2015-04-17T14:10:00.000Z").format(),
    votes : 8
  },
];

// Make our "database" accessible to our router
app.use(function (req, res, next) {
  res.locals.db = db;
  res.locals.session = req.session;
  next();
});

// Register routes and route handlers
app.use('/', routes);
app.use('/linkit', linkit);
app.use('/links', links);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error  : err
  });
  /*
   res.render('error', {
   message: err.message,
   error  : err
   });
   */
});

module.exports = app;
