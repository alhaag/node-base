var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.setLocale("en");
  res.cookie('lang', 'en', { maxAge: 900000, httpOnly: true });

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
  // init & guess, see hepler below
  var traducao = res.__("app.name");
  res.send(traducao);
});

module.exports = router;
