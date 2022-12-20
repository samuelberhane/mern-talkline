const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");

// create message
router.post("/", createMessage);

// get messages by conversation id
router.post("/allMessages", getMessages);

module.exports = router;
