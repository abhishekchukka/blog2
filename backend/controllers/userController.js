const asynchHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/signin
//@access Public
const registerUser = asynchHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashPass = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashPass,
  });
  console.log(user);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

//@desc Login a user
//@route POST /api/users/login
//@access Public
const loginUser = asynchHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Password is wrong");
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  res.status(200).json({ token: `${token}` });
});
//@desc Current user
//@route GET /api/users/current
//@access Private
const currentUser = asynchHandler(async (req, res) => {
  res.status(200).json({ user: req.user });
});
module.exports = { registerUser, loginUser, currentUser };
