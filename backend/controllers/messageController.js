const Message = require("../models/messageModel");

// create message
const createMessage = async (req, res) => {
  try {
    let message = await Message.create({ ...req.body });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get messages by conversation id
const getMessages = async (req, res) => {
  const { id } = req.params;
  try {
    let userMessages = await Message.find({ conversationId: id });
    res.status(200).json(userMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createMessage, getMessages };
