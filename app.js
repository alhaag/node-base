// dependencies
var express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    i18n         = require('i18n');

// routes
var routes     = require('./routes/index'),
    login      = require('./routes/login'),
    lockscreen = require('./routes/lockscreen'),
    contato    = require('./routes/contato'),
    users      = require('./routes/users'),
    quemsomos  = require('./routes/quemsomos'),
    upload     = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

i18n.configure({
    locales:['pt', 'en'],
    defaultLocale: 'pt',
    cookie: 'lang',
    directory: __dirname + '/locales',
    extension: '/translation.json'
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser({ keepExtensions: true, uploadDir: "uploads" }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/locales', express.static(__dirname + '/locales'));
app.use('/plugins/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/plugins/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/plugins/font-awesome', express.static(__dirname + '/node_modules/font-awesome'));
app.use('/plugins/admin-lte', express.static(__dirname + '/node_modules/admin-lte/dist'));
app.use('/plugins/cropit', express.static(__dirname + '/node_modules/cropit/dist'));
app.use(i18n.init);

app.use('/', routes);
app.use('/login', login);
app.use('/lockscreen', lockscreen);
app.use('/contato', contato);
app.use('/users', users);
app.use('/quemsomos', quemsomos);
app.use('/upload', upload);

console.log(i18n.__('Hello teste'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
