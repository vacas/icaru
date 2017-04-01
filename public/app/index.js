var express = require('express');
// var app = express();
// var port = process.env.PORT || 3000;

app.on('ready', function(){
  var server = express();
  mainWindow = newBrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: false,
  });
  mainWindow.loadURL('http://localhost:3000/');
  mainWindow.focus();

  server.set('main', __dirname + '/public/app');
  server.use('/', express.static(__dirname + '/public/app'));
});
