const express = require("express");
const router = express.Router();
const {
  createConversation,
  getConversation,
} = require("../controllers/conversationController");

// create conversation
router.post("/", createConversation);

// get user conversation
router.get("/:id", getConversation);

module.exports = router;
