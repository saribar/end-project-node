// Install with 'npm i <module>' & Import necessary modules
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chat:message', (data) => {
    io.emit('chat:message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});