const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { createSocket } = require('dgram');
const CHAT_BOT = 'ChatBot';
let chatRoom = '';
let allUsers = [];

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET, POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  
  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);
  
    let _createdtime_ = Date.now();

  socket.to(room).emit('receive_message', {
      message: `${username} has joinde the chat room`,
      username: CHAT_BOT,
      _createdtime_,
  });

  chatRoom = room;
  allUsers.push({id: socket.id, username, room});
  chatRoomUsers = allUsers.filter((user) => user.room === room);
  socket.to(room).emit('chatroom_users', chatRoomUsers);
  // console.log(createSocket);
  // createSocket.emit('chatroom_users', chatRoomUsers);

  
  });
});

server.listen(4000, () => 'server is running on port 3000');
