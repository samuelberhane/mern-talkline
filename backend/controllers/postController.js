const Post = require("../models/postModel");

// create new post
const newPost = async (req, res) => {
  const { userId, image, desc, tags } = req.body;
  try {
    const post = await Post.create({
      userId,
      image,
      desc,
      tags,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get posts from single user id
const getUserPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const singleUserPosts = await Post.find({ userId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(singleUserPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all posts
const getPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().sort({
      createdAt: -1,
    });
    res.json({ allPosts, status: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get one post
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update post
const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post.userId === req.body.userId) {
      const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete post
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json("Post Deleted.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// like or unlike post
const handleLikePost = async (req, res) => {
  const { id } = req.params;
  const { likingUser } = req.body;
  try {
    let likedPost = await Post.findById(id);
    const index = likedPost.likes.indexOf(likingUser._id);
    console.log(index);
    if (index === -1) {
      likedPost.likes.push(likingUser._id);
    } else {
      likedPost.likes.splice(index, 1);
    }
    const updatedPost = await Post.findByIdAndUpdate(id, likedPost, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  newPost,
  deletePost,
  handleLikePost,
  updatePost,
  getPost,
  getPosts,
  getUserPosts,
};
