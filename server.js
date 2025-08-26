"use strict";


var worldName = "world"

var fs = require('fs');
var dir = `./saves/${worldName}`;

const Chunk = require('./modules/world/chunkServer.js')
const World = require("./modules/world/worldServer.js")

var world = new World(Chunk,worldName);

if (!fs.existsSync(dir)){
  console.log("World does not exist, creating world")
  fs.mkdirSync(dir);
  fs.mkdirSync(dir+"/data");
  fs.mkdirSync(dir+"/players");
  fs.writeFile(`./saves/${worldName}/banned_ips.txt`, JSON.stringify([]), function(){});
  
  console.log("Generating Spawn");
  for(let x=-1;x<=1;x++){
    for(let y=-1;y<=1;y++){
      world.generate_chunk(x,y);
    }
  }
}

var banned = [];

console.log("Starting Server")

//Create Server on given port with given title
process.title = 'MinecraftJSServer';
var webSocketsServerPort = 25565;

var webSocketServer = require('websocket').server;
var http = require('http');

var clients = []
var online_ids = []

var server = http.createServer(function(request, response) {});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "+ webSocketsServerPort);
});

var wsServer = new webSocketServer({
  httpServer: server
});

//On connection
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin '+ request.origin + '.');
  fs.readFile(`./saves/${worldName}/banned_ips.txt`, 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return
    }
    banned = JSON.parse(data);
  });

  //Check IP address here is not in banned IPs
  if(banned.includes(request.origin)){
    var connection = request.reject(null, request.origin); 
    return;
  }else{
    var connection = request.accept(null, request.origin); 
  }

  var index = clients.push(connection) - 1;
  var connData = false;
  var playerData = {};
  console.log((new Date()) + ' Connection accepted.');

  // send message
  // connection.sendUTF(JSON.stringify({ TEXT HERE } ));

  // user sent some message
  connection.on('message', function(message) {
    if (message.type === 'utf8') { // accept only text
      if(connData === false){
        connData = JSON.parse(message.utf8Data)
        if (!fs.existsSync(`./saves/${worldName}/players/${connData.id}.txt`)){
          console.log("New Player")
          fs.writeFile(`./saves/${worldName}/players/${connData.id}.txt`, JSON.stringify(playerData), function(){});
        }else{
          console.log("Returning Player")
          fs.readFile(`./saves/${worldName}/players/${connData.id}.txt`, 'utf8' , (err, data) => {
            if (err) {
              console.error(err);
              return
            }
            playerData = JSON.parse(data);
            console.log(playerData);
          });
        }
      }else{
        let msgplayer = JSON.parse(message.utf8Data).entities.player
        playerData.x = msgplayer.x
        playerData.y = msgplayer.y
        playerData.z = msgplayer.z
        playerData.euler = msgplayer.euler
      } 
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
      console.log((new Date()) + " Peer " + connection.origin + " disconnected.");
      //Persist Player data
      fs.writeFile(`./saves/${worldName}/players/${connData.id}.txt`, JSON.stringify(playerData), function(){});
      // remove user from the list of connected clients
      clients.splice(index, 1);
  });
});




