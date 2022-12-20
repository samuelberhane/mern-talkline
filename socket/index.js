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

io.on("connection", (socket) => {
  console.log("User Connected!");
  socket.on("addUser", (userId) => {
    checkIds(userId, socket.id);
    io.emit("getOnlineUsers", usersArray);
  });
  socket.on("sendMessage", (data) => {
    let receiverUser = usersArray?.find((user) => user.userId === data.to);
    if (receiverUser) {
      io.emit("getMessage", data);
    }
  });
  socket.on("userLogout", (userId) => {
    usersArray = usersArray.filter((user) => user.userId !== userId);
    io.emit("getOnlineUsers", usersArray);
  });
});

server.listen(process.env.PORT, () => {
  console.log("server running");
});
