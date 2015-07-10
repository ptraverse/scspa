var express = require('express');
var app = express();
var jade = require('jade');

//Express Settings
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

//Routes
//Route: Root
app.get('/', function (req, res) {
  var html = jade.renderFile('templates/index.jade');
	res.send(html);
});

//Initialize Server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App online at http://%s:%s', host, port);
});
