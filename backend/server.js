const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const conversationRouter = require("./routes/conversationRoute");
const messageRouter = require("./routes/messageRoute");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// config env
dotenv.config();
const PORT = process.env.PORT || 8000;

// public files
app.use("/images", express.static(path.join(__dirname, "images")));

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Talkline");
});

// log requests
app.use(morgan("tiny"));

// use body parser
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/messages", messageRouter);
app.use("/api/conversations", conversationRouter);
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ message: "Image Uploaded!" });
});

// connect to database and run server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connect to database and server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
