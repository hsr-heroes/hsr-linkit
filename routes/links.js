var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    _ = require('underscore');

router.get('/', function (req, res) {
  var db = req.db;
  res.json(db);
});

router.get('/:id', function (req, res) {
  var db = req.db;

  var link = _.find(db, function (item) {
    return item.id == req.params.id;
  });

  if (link !== undefined) {
    res.json(link);
  } else {
    res.status(404).end();
  }
});

router.post('/', function (req, res) {
  var db = req.db;

  if (
      req.body.title === undefined ||
      req.body.url === undefined ||
      req.body.author === undefined
  ) {
    res.status(500).end();
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

router.put('/:id', function (req, res) {
  var db = req.db;

  var pos = _.findIndex(db, function (item) {
    return item.id == req.params.id;
  });

  if (req.body && pos) {
    res.json(_.extend(db[pos], _.pick(req.body, 'title', 'url', 'author')))
  } else {
    res.status(500).end();
  }
});

router.post('/:id/up', function (req, res) {
  var db = req.db;

  var item = _.find(db, function (item) {
    return item.id == req.params.id;
  });

  if (item) {
    item.votes++;
    res.json(item);
  } else {
    res.status(500).end();
  }
});

router.post('/:id/down', function (req, res) {
  var db = req.db;

  var item = _.find(db, function (item) {
    return item.id == req.params.id;
  });

  if (item) {
    item.votes--;
    res.json(item);
  } else {
    res.status(500).end();
  }
});

module.exports = router;
