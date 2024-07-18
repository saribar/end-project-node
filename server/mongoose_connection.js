const mongoose = require('mongoose');
require('dotenv').config();
const cars = require('.//schemas/cars');
const user= require('.//schemas/user');
const message = require('./schemas/message');

const dbUrl = process.env.MONGODB_CONNECTION;

await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  console.log('Connected');