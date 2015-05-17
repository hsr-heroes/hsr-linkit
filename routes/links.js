var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    _ = require('underscore'),
    linkController = require('../controllers/link');

// Session check
function ensureUserIsLoggedIn(req, res, next) {
  if (req.session.username)
    return next();
  else {
    res.json({error: 'Not logged in!'});
  }
}

router.get('/', function (req, res) {
  res.json(linkController.getAll());
});

router.get('/:id', function (req, res, next) {
  res.json(linkController.getOne(req.params.id));
});

router.post('/', ensureUserIsLoggedIn, function (req, res, next) {
  if (
      req.body.title === undefined ||
      req.body.url === undefined ||
      req.body.url.match(/https?:\/\/.+/i) === null
  ) {
    res.json({error: 'Whoops!'});
  }

  res.json(linkController.addLink(req.body.title, req.body.url, req.session.username));
});

router.delete('/:id', ensureUserIsLoggedIn, function (req, res, next) {
  var link = linkController.getOne(req.params.id);

  if (link !== undefined && linkController.isAuthor(link.id, req.session.username)) {
    linkController.removeLink(req.params.id);
  } else {
    res.json({error: 'Whoops!'});
  }

  res.json(link);
});

router.put('/:id', ensureUserIsLoggedIn, function (req, res, next) {
  if (!linkController.isAuthor(req.params.id, req.session.username)) {
    res.json({error: 'Whoops!'});
  }

  var link = linkController.updateLink(req.params.id, req.body);

  if (link === false) {
    res.json({error: 'Whoops!'});
  } else {
    res.json(link);
  }
});

router.post('/:id/up', ensureUserIsLoggedIn, function (req, res, next) {
  var link = linkController.upvoteLink(req.params.id);

  if (link === false) {
    res.json({error: 'Whoops!'});
  }

  res.json(link);
});

router.post('/:id/down', ensureUserIsLoggedIn, function (req, res, next) {
  var link = linkController.downvoteLink(req.params.id);

  if (link === false) {
    res.json({error: 'Whoops!'});
  }

  res.json(link);
});

module.exports = router;