var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = res.locals.db;
  res.render('linkit', { title: 'Links', links: db, session: req.session });
});

module.exports = router;
