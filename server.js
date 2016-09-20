var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use('/', express.static(_dirname + '/phaser-icaru'));

app.listen(port);
