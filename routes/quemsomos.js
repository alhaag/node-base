var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var frase;

  carregaFrase = function (callback) {
    setTimeout(function() {
      //Simula leitura da frase no banco de dados.
      frase = "Minha frase NÃO obstrutiva";
      callback();
    }, 3000)
  };

  imprimeFrase = function () {
    console.log(frase);
  };

  carregaFrase(imprimeFrase);

  console.log('Olá');

  res.send('respond with a resource');
});

module.exports = router;
