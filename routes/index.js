var express = require('express');
var router = express.Router();

var linkController = require('../controllers/link');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/linkit');
});

module.exports = router;