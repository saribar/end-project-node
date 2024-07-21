const cars = require('.//schemas/cars');
const carRouter = require('./routes/cars');
require('dotenv').config();
const { login, verifyJWT,register } = require('./services/jwt');
const users = require('.//schemas/user');
const userRouter = require('./routes/users')
const message = require('./schemas/message');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('./db');
const { createSocket } = require('dgram');
const leaveRoom = require('./utils/leave-room');
const mongodbSaveMessage = require('./services/mongodb-save-message');
const mongodbGetMessages = require('./services/mongodb-get-messages');
require('console');
const jwt = require('jsonwebtoken');

require('dotenv').config();
var app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/cars',carRouter);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET, POST'],
    },
});

const CHAT_BOT = 'ChatBot';
let chatRoom = '';
let allUsers = [];

app.use(cors());

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
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
  }
  );

  socket.on('send_message', (data) => {
    const { message, username, room, _createdtime_ } = data;
    io.in(room).emit('receive_message', data);
    mongodbSaveMessage(message, username, room, _createdtime_)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    io.in(room).emit('receive_message', {
      username,
      room,
      message,
      _createdtime_,
    });

    mongodbGetMessages(room)
      .then((last100Messages) => {
        socket.emit('last_100_messages');
      })
      .catch((err) => console.log(err));
  });

  socket.on('leave_room', (data) => {
    const { username, room } = data;
    socket.leave(room);
    const __createdtime__ = Date.now();
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit('chatroom_users', allUsers);
    socket.to(room).emit('receive_message', {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    });
    console.log(`${username} has left the chat`);
  });
});

server.listen(4000, () => 'server is running on port 3000');

app.post('/register', async (req, res) => {
  try {
    const { username, password, role='user' } = req.body;
    const newUser = await register(username, password, role);
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ userId: newUser.id , role: newUser.role}, secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await login(username, password);
    res.json({ token });
    console.log(token);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

const isAdmin = async (req,res, next) => {
  try{
    const user = await verifyJWT(req.headers.authorization);
    if(user.role === 'admin'){
      next();
    }else{
      res.status(401).json({ error: 'Unauthorized access. Admin role required.' });
    }
  }catch(error){
    res.status(error.status || 500).json({ error: error.message });
  }
};

app.use('/protected', async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  try {
    const user = await verifyJWT(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});


app.get('/protected/data', (req, res) => {
  const user = req.user;

  res.json({ data: 'Protected data' });
});

app.listen(8000, () => {
  console.log('Port 8000');
});