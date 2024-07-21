const mongoose = require('../db');
const MessageModel = require('../schemas/message');

async function mongodbGetMessage(room) {
  try {
    const messages = await MessageModel.find({ room })
      .sort({ createdAt: -1 }) // Sort by createdAt descending
      .limit(10);
    return messages;
  } catch (error) {
    console.error('שגיאה בהבאת הודעות מ-MongoDB: ', error);
    return null;
  }
}

module.exports = mongodbGetMessage;