const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;

  // check empty input fields
  let emptyFields = [];
  if (!firstname) emptyFields.push("firstname");
  if (!lastname) emptyFields.push("lastname");
  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");
  if (!confirmPassword) emptyFields.push("confirmPassword");

  if (emptyFields.length > 0)
    return res.status(400).json({ error: "Please Fill In All Fields!" });

  //   check if email exists
  const emailExists = await User.findOne({ email });
  if (emailExists)
    return res.status(401).json({ error: "Email Already Exists!" });

  // check if password and confirm password are the same
  if (password !== confirmPassword)
    return res.status(403).json({ error: "Password Don't Match!" });

  // hash user password
  const hash = await bcrypt.hash(password, 12);

  //  create user
  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hash,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  // check empty input fields
  let emptyFields = [];
  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");

  if (emptyFields.length > 0)
    return res.status(400).json({ error: "Please Fill In All Fields!" });

  // check user exists
  const userExists = await User.findOne({ email });

  // user not register
  if (!userExists) return res.status(404).json({ error: "Email Not Exists." });

  // check password
  const matchPassword = await bcrypt.compare(password, userExists.password);

  // password not match
  if (!matchPassword)
    return res.status(404).json({ error: "Incorrect Password!" });

  // create token
  const token = jwt.sign({ _id: userExists._id }, process.env.SECRET, {
    expiresIn: "6h",
  });

  let { isAdmin, password: userPassword, ...other } = userExists._doc;

  res.status(200).json({ user: other, token });
};

module.exports = { register, login };
