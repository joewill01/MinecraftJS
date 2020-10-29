function createConn(connData){
  if(connData == undefined){
    connData = {};
  }
  if (connData.ip == undefined) {
    connData.ip = "127.0.0.1"
  }
  if (connData.port == undefined) {
    connData.port = "25565"
  }

  // if user is running mozilla then use it's built-in WebSocket
  window.WebSocket = window.WebSocket || window.MozWebSocket;
  // if browser doesn't support WebSocket, just show
  // some notification and exit
  if (!window.WebSocket) {
    alert("browser does not support websockets")
    return;
  }

  // open connection
  serverConn = new WebSocket(`ws://${connData.ip}:${connData.port}`);
  serverConn.onopen = function () {
    console.log("successfully connected")
    serverConn.send(JSON.stringify({"id":"0123456"}))
  };
  serverConn.onerror = function (error) {
    // just in there were some problems with connection...
  };

  serverConn.onmessage = function (message) {
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log('Invalid JSON: ', message.data);
      return;
    }
    console.log(json)
  };

  //connection.send(msg);
}
