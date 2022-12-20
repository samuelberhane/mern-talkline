const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    const tempUsers = users.map((user) => {
      const { password, updatedAt, ...other } = user._doc;
      return other;
    });
    res.json({ tempUsers, status: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get one user
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    // hash and update password
    if (password) {
      const hashPassword = await bcrypt.hash(password, 12);
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { ...req.body, password: hashPassword },
        { new: true }
      );
      const { password, updatedAt, ...user } = updatedUser._doc;
      return res.status(200).json(user);
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const { password: userPassword, updatedAt, ...user } = updatedUser._doc;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {}
};

// follow user
const followUser = async (req, res) => {
  const { id } = req.params;
  const followingUser = req.body;
  let usersArray = [];

  // add following id to followed user array
  try {
    let followedUser = await User.findById(id);
    if (!followedUser.followers.includes(followingUser._id)) {
      followedUser.followers.push(followingUser._id);
    }
    const updatedFollowedUser = await User.findByIdAndUpdate(id, followedUser, {
      new: true,
    });
    let {
      password: followedPassword,
      updatedAt: followedUpdate,
      ...followedOther
    } = updatedFollowedUser._doc;
    usersArray.push(followedOther);
    // add followed user id to following user array
    const user = await User.findById(followingUser._id);
    user.following.push(id);
    const updatedFollowingUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    let { password, updatedAt, ...other } = updatedFollowingUser._doc;
    usersArray.push(other);
    res.status(200).json(usersArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// unfollow user
const unfollowUser = async (req, res) => {
  const { id } = req.params;
  const unfollowingUser = req.body;
  let usersArray = [];
  // remove following id from followed user array
  try {
    let followedUser = await User.findById(id);
    if (followedUser.followers.includes(unfollowingUser._id)) {
      const index = followedUser.followers.indexOf(unfollowingUser._id);
      followedUser.followers.splice(index, 1);
    }
    const updatedFollowedUser = await User.findByIdAndUpdate(id, followedUser, {
      new: true,
    });
    let {
      password: followedPassword,
      updatedAt: followedUpdate,
      ...followedOther
    } = updatedFollowedUser._doc;
    usersArray.push(followedOther);
    // remove followed user id from following user array
    const user = await User.findById(unfollowingUser._id);
    const index = user.following.indexOf(id);
    user.following.splice(index, 1);
    const updatedFollowingUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    const { password, updatedAt, ...other } = updatedFollowingUser._doc;
    usersArray.push(other);
    res.status(200).json(usersArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUsers,
};
