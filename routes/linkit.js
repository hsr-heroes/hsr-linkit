var express = require('express'),
    router = express.Router(),
    userController = require('../controllers/user'),
    linkController = require('../controllers/link');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('linkit', {
    title: 'Links',
    user : userController.getOne(req.session.username),
    links: linkController.getAll()
  });
});

module.exports = router;
