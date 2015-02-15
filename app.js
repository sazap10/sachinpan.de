/**
 * Module dependencies.
 */

var express        = require('express'),
    path           = require('path'),
  // mongoose       = require('mongoose'),
    logger         = require('morgan'),
    bodyParser     = require('body-parser'),
    compress       = require('compression'),
    favicon        = require('serve-favicon'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    config         = require('./config'),
    routes         = require('./routes'),
    contact         = require('./routes/contact');


// mongoose.connect(config.database.url);
// mongoose.connection.on('error', function () {
//   console.log('mongodb connection error');
// });

var app = express();



/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app
  .use(compress())
  .use(favicon(__dirname + '/public/ico/favicon.ico'))
  .use(logger('dev'))
  .use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }))
  .use(methodOverride())
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes.indexRouter)
  .use('/contact', contact)
  .use(function (req, res) {
    res.status(404).render('404', {title: 'Not Found :('});
  });

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

console.log('End server.js');