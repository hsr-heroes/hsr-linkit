var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    _ = require('underscore');

// Session check
function ensureUserIsLoggedIn(req, res, next) {
// passport.js provides this method req.isAuthenticated())
  if (res.locals.session.name)
    return next();
  else {
    return next(new Error('Not logged in!'));
  }
}

router.get('/', function (req, res) {
  var db = res.locals.db;
  res.json(db);
});

router.get('/:id', function (req, res, next) {
  var db = res.locals.db;

  var link = _.find(db, function (item) {
    return item.id == req.params.id;
  });

  if (link !== undefined) {
    res.json(link);
  } else {
    return next(new Error('Whoops!'));
  }
});

router.post('/', ensureUserIsLoggedIn, function (req, res, next) {
  var db = res.locals.db;

  if (
      req.body.title === undefined ||
      req.body.url === undefined ||
      req.body.url.match(/https?:\/\/.+/i) === null ||
      req.body.author === undefined
  ) {
    return next(new Error('Whoops!'));
  }

  var link = {
    id    : db.length + 1,
    title : req.body.title,
    url   : req.body.url,
    author: req.body.author,
    date  : moment().format(),
    votes : 0
  }

  db.push(link);
  res.json(link);
});

router.put('/:id', ensureUserIsLoggedIn, function (req, res, next) {
  var db = res.locals.db;

  var pos = _.findIndex(db, function (item) {
    return item.id == req.params.id;
  });

  if (req.body && pos) {
    res.json(_.extend(db[pos], _.pick(req.body, 'title', 'url', 'author')));
  } else {
    return next(new Error('Whoops!'));
  }
});

router.post('/:id/up', ensureUserIsLoggedIn, function (req, res, next) {
  var db = res.locals.db;

  var item = _.find(db, function (item) {
    return item.id == req.params.id;
  });

  if (item) {
    item.votes++;
    res.json(item);
  } else {
    return next(new Error('Whoops!'));
  }
});

router.post('/:id/down', ensureUserIsLoggedIn, function (req, res, next) {
  var db = res.locals.db;

  var item = _.find(db, function (item) {
    return item.id == req.params.id;
  });

  if (item) {
    item.votes--;
    res.json(item);
  } else {
    return next(new Error('Whoops!'));
  }
});

module.exports = router;