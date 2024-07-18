const mongoose = require('mongoose'); 

const messageSchema = new mongoose.Schema({
    message: String,
    username: String,
    room: String,
    createdAt: Date,
}, { indexes: [{ room: 1 }] });
module.exports = mongoose.model('Message',messageSchema);