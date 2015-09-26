var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  var title = "Discovery Tecnologia";
  res.render('index', { title: title });
});

module.exports = router;
