var express    = require('express');
var formidable = require('formidable');
var fs         = require('fs');
var util       = require('util');
var xmlrpc     = require('xmlrpc');
var router     = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {       
    
    var client = xmlrpc.createClient({host: '127.0.0.1', port: 9003});
    
    client.methodCall('sistema_infos_maquina', [], function (error, value) {
        if (error) {
            console.log('error: ', error);
            console.log('req headers: ', error.req && error.req._header);
            console.log('res code: ', error.res && error.res.statusCode);
            console.log('res body: ', error.body);
        } else {
            console.log('value: ', value);
            console.log(value.IP);
        }
    });    
    
    res.render('upload', { title: 'Upload' });
});

router.post('/send', function(req, res, next) {
    
    var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./uploads"; //set upload directory
    form.keepExtensions = true;   //keep file extension

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));   
        res.end("upload complete");    
    });                                         
    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = './uploads/';
        fs.rename(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!");
            }
        });
    });
    
});

module.exports = router;
