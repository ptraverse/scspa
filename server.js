var express = require('express');
var app = express();
var jade = require('jade');

app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  console.log("Hello World!");
  var html = jade.renderFile('templates/index.jade');
	res.send(html);
});

app.get('/test', function (req, res) {
	res.send('Something Else!');
});

app.get('/tt', function (req, res) {
	var html = jade.renderFile('templates/total_tweets.jade');
	res.send(html);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
