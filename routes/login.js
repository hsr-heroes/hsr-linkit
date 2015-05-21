var express = require('express'),
    router = express.Router(),
    userController = require('../controllers/user');

router.get('/', function (req, res) {
  if (req.session) {
    res.json({username: req.session.username, fullname: req.session.fullname});
  } else {
    return null;
  }
});

router.post('/', function (req, res, next) {
  if (!req.body.name || !userController.getOne(req.body.name)) {
    return next(new Error('User does not exist!'));
  }

  req.session.username = req.body.name;

  res.redirect('/linkit');
});

router.delete('/', function (req, res) {
  req.session.destroy();
  res.end();
});

module.exports = router;