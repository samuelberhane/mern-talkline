const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    users: [String],
    sender: String,
    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
