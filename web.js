var express = require('express');

var fs = require('fs');
var Buffer = require('buffer').Buffer;
var constants = require('constants');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
	fs.open("index.html", 'r', function(status, fd) {
		if (status) {
			console.log(status.message);
			return;
		}
		var buffer = new Buffer(5000);
		fs.read(fd, buffer, 0, 5000, 0, function(err, num) {
			console.log(buffer.toString('utf-8', 0, num));
  		response.send(buffer.toString('utf-8', 0, num));
		});
	});
  //response.send('Hello World 2!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
