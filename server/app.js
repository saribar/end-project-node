const express = require('express');
const cars = require('./models/cars');
const carsRoute = require('./routes/cars');
const mongoose = require('mongoose');
require('dotenv').config();
const { login, verifyJWT } = require('./jwt');
const user= require('../schemas/user');

var app = express();

main().catch(err => console.log(err));

async function main() {
  const dbUrl = process.env.MONGODB_CONNECTION;

  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  console.log('Connected');
}

app.use(express.json());

const my_user = new user({ 
    name: "Takashi", 
    email: "s8407914@gmail.com", 
    password: "1234"
}); 
  
my_user.save();

// הגדרת נקודת קצה לאימות משתמש
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// הגדרת נקודת קצה לאימות JWT
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

// הגדרת נקודת קצה הדורשת אימות JWT
app.get('/protected/data', (req, res) => {
  const user = req.user;
  // ... גישה לנתונים של המשתמש ...
  res.json({ data: 'Protected data' });
});

app.listen(8000, () => {
  console.log('Port 8000');
});