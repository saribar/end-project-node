
const cars = require('.//schemas/cars');
const carsRoute = require('./routes/cars');
require('dotenv').config();
const { login, verifyJWT } = require('./jwt');
const user = require('.//schemas/user');
const message = require('./schemas/message');
const mongoose = require('mongoose');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});


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