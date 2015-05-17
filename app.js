var express = require('express'),
    path = require('path'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    moment = require('moment'),
    linkController = require('./controllers/link'),
    userController = require('./controllers/user'),
    routes = require('./routes/index'),
    linkit = require('./routes/linkit'),
    links = require('./routes/links'),
    login = require('./routes/login');

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

// Init Links DB
linkController.init();

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

// Development error handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error  : err,
      user   : userController.getOne(req.session.username)
    });
  });
}

// Production error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error  : {},
    "user" : userController.getOne(req.session.username)
  });
});

module.exports = app;
