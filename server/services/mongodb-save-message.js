const MessageModel = require('../schemas/message');

async function mongodbSaveMessage(message, username, room, _createdtime_) {
    try {
        const newMessage = new MessageModel({
            message: message,
            username: username,
            room: room,
            createdAt: _createdtime_,
        });

        const saveMessage= await newMessage.save();

        return 'Message saved successfully!';

    }
    catch(error){
        console.error('Error saving message to mongoDB:', error);
        return null;
    } 

}
module.exports = mongodbSaveMessage;