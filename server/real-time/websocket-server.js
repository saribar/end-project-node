const WebSocket = require('ws'); // use wss for secured option
const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('User connected');

// Handle socket connection
  socket.on('message', (message) => {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('User disconnected');
  });
});