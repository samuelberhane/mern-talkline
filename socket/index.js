const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_PORT,
    methods: ["GET", "POST"],
  },
});

let usersArray = [];

const checkIds = (userId, socketId) => {
  !usersArray.some((user) => user.userId === userId) &&
    usersArray.push({ userId, socketId });
};

const removeUser = (socketId) => {
  return usersArray.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("User Connected!");
  socket.on("onlineUser", (userId) => {
    checkIds(userId, socket.id);
    io.emit("getOnlineUsers", usersArray);
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      let receiverUser = usersArray?.find((user) => user.userId === receiverId);
      if (receiverUser)
        io.to(receiverUser.socketId).emit("getMessage", { senderId, text });
    });
  });

  io.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getOnlineUsers", usersArray);
  });
});

server.listen(process.env.PORT, () => {
  console.log("server running");
});
