const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  getUsers,
  unfollowUser,
} = require("../controllers/userController");

// get user
router.get("/:id", getUser);

// update user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

// follow user
router.put("/follow/:id", followUser);

// unfollow user
router.put("/unfollow/:id", unfollowUser);

// get all users
router.get("/", getUsers);

module.exports = router;
