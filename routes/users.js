var express = require('express');
var mysql   = require('mysql');
var router  = express.Router();

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    // do something
  } else {
    next();
  }
  res.send('editar usuario ' + id);
});

/* GET users listing. */
router.get('/', function(req, res, next) {

  /*var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : '001_encontrepecas'
  });

  connection.connect();

  connection.query('SELECT * from empresa', function(err, rows, fields) {
    if (!err) {
      console.log('The solution is: ', rows);
      res.render('users', {title:'Usuários', users: rows});
    } else {
      console.log('Error while performing Query.');
    }
  });

  connection.end();*/

  var mongo = require('mongoskin');
  var db = mongo.db("mongodb://localhost:27017/test", {native_parser:true});
  //db.bind('restaurants');
  db.bind('restaurants').find().toArray(function(err, items) {
    if (!err) {
      //console.log('The solution is: ', items);
      res.render('users', {title:'Usuários', users: items});
    } else {
      console.log('Error while performing Query.');
    }
    db.close();
  });

});

module.exports = router;
