const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// register user
router.post("/register", register);

// login user
router.post("/login", login);

module.exports = router;
