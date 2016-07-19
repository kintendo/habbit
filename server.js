'use strict';

var http = require('http');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function () {
  console.log('listening on port', PORT);
});
