var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
  if (req.session) {
    res.json({username: req.session.username});
  } else {
    return null;
  }
});

router.post('/', function (req, res, next) {
  if (!req.body.name) {
    return next(new Error('Whoops!'));
  }

  req.session.username = req.body.name;

  res.redirect('/linkit');
});

router.delete('/', function (req, res) {
  req.session.destroy();
  res.end();
});

module.exports = router;