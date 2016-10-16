var express = require('express'),
  path = require('path'),
 // logger = require('morgan'),
 // favicon = require('serve-favicon'),
    errorhandler = require('errorhandler'),

  bodyparser = require('body-parser'),
  serveIndex = require('serve-index'),
    util=require('util');
   fs = require ('fs');
var app = express();
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'jade');
var routes = require('./libraries/routes.js');

//__dirname = path.resolve(path.dirname());


app.set('port', process.env.PORT || 8000);



app.use('/public', serveIndex(
'/public',
  {'icons': true}
));
routes(app);
app.use(express.static('public'));

app.use(errorhandler());
app.use(bodyparser({
    keepExtensions: true,
    defer: true
}));



var http = require('http').Server(app);

http.listen(3000);



