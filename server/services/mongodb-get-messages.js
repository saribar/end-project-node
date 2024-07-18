const mongoose = require('mongoose');
const MessageModel = require('../schemas/message');

let mongoConnection; 
async function mongodbGetMessage(room) {
  try {

    const messages = await MessageModel.find({ room }, { limit: 10
    });
    return messages;
  } catch (error) {
    console.error('שגיאה בהבאת הודעות מ-MongoDB: ', error);
    return null;
  }
}

module.exports = mongodbGetMessage;