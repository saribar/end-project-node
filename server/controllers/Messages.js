const message = require('../schemas/message');

exports.getAllMessage = async (req, res) => {
    try {
      const messages = await message.find();
      console.log("succsed");
      res.json(messages);

    } catch (error) {
      console.error('Failed to get users:', error);
      res.status(500).json({ message: 'Failed to get users' });
    }
  };