"use strict";
//Create Server on given port with given title
process.title = 'MinecraftJSServer';
var webSocketsServerPort = 25565;

var webSocketServer = require('websocket').server;
var http = require('http');

var clients = []

var server = http.createServer(function(request, response) {});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "+ webSocketsServerPort);
});

var wsServer = new webSocketServer({
  httpServer: server
});

//Helper Function to ensure no dodgy strings are passed in
function validateMessage(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

//On connection
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin '+ request.origin + '.');
  var connection = request.accept(null, request.origin); 

  var index = clients.push(connection) - 1;
  var userData = false;
  console.log((new Date()) + ' Connection accepted.');

  // send message
  // connection.sendUTF(JSON.stringify({ TEXT HERE } ));

  // user sent some message
  connection.on('message', function(message) {
    if (message.type === 'utf8') { // accept only text
      if(userData === false){
        userData = validateMessage(message.utf8Data)
      }else{

      }
      console.log(validateMessage(message.utf8Data))
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
      console.log((new Date()) + " Peer " + connection.origin + " disconnected.");
      // remove user from the list of connected clients
      clients.splice(index, 1);
  });
});




