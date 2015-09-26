var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contato', { title: 'Contato' });
});

router.get('/mail', function(req, res, next) {
    console.log('Enviou e-mail get');
    res.json({'status' : 'ok', 'message':'E-mail enviado get'});
});

router.post('/send-mail', function(req, res, next){
    console.log('Enviou e-mail post');
    console.log(req.body);
    res.json({'status' : 'ok', 'message':'E-mail enviado post', 'posted':req.body});
});

module.exports = router;
