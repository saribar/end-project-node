const mongoose = require('mongoose');
require('dotenv').config();
const cars = require('.//schemas/cars');
const user= require('.//schemas/user');
const message = require('./schemas/message');

const dbUrl = process.env.MONGODB_CONNECTION; 

mongoose.connect(dbUrl, {
  serverSelectionTimeoutMS: 20000 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

mongoose.connection.on('timeout', () => {
  console.warn('MongoDB connection timed out!');
});

module.exports = mongoose; 





//   const db = mongoose.connection;

//   console.log('Connected');