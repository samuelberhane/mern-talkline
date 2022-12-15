const express = require("express");
const router = express.Router();
const {
  newPost,
  handleLikePost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  getUserPosts,
} = require("../controllers/postController");

// create new post
router.post("/", newPost);

// like or unlike post
router.put("/like/:id", handleLikePost);

// delete post
router.delete("/:id", deletePost);

// get all posts
router.get("/", getPosts);

// get posts of single user
router.get("/user/:id", getUserPosts);

// get one post
router.get("/:id", getPost);

// update post
router.put("/:id", updatePost);

module.exports = router;
