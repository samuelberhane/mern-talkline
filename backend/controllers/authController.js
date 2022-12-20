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
    return res.json({ error: "Please Fill In All Fields!", status: false });

  //   check if email exists
  const emailExists = await User.findOne({ email });
  if (emailExists)
    return res.json({ error: "Email Already Exists!", status: false });

  // check if password and confirm password are the same
  if (password !== confirmPassword)
    return res.json({ error: "Password Don't Match!", status: false });

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
    res.json({ user, status: true });
  } catch (error) {
    res.status(500).json({ error: error.message, status: false });
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
    return res.json({ error: "Please Fill In All Fields!", status: false });

  // check user exists
  const userExists = await User.findOne({ email });

  // user not register
  if (!userExists)
    return res.json({ error: "Email Not Exists.", status: false });

  // check password
  const matchPassword = await bcrypt.compare(password, userExists.password);

  // password not match
  if (!matchPassword)
    return res.json({ error: "Incorrect Password!", status: false });

  // create token
  const token = jwt.sign({ _id: userExists._id }, process.env.SECRET, {
    expiresIn: "6h",
  });

  let { isAdmin, password: userPassword, ...other } = userExists._doc;

  res.json({ user: other, token, status: true });
};

module.exports = { register, login };
