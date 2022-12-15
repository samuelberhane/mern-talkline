const Conversation = require("../models/conversationModel");

// create conversation
const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    let conversation = await Conversation.create({
      members: [senderId, receiverId],
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get conversation by user id
const getConversation = async (req, res) => {
  const { id } = req.params;
  try {
    let userConversation = await Conversation.find({
      members: { $in: [id] },
    });
    res.status(200).json(userConversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createConversation, getConversation };
