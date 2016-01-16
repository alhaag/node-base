var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var title = "NodeJs App";
  res.render('index', { title: title });
});

module.exports = router;
