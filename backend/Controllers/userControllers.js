const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// const generateToken = require("../config/generateToken");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

const getLoggedInUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  if (!id) {
    res.status(400);
    throw new Error("Please provide appropriate id");
  }
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User with this id does not exist");
  }
  res.status(200).json(user);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      message: "User created successfully",
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create a user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const token = user.generateToken();

  if (user && (await user.matchPassword(password))) {
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      })
      .status(201)
      .json({
        message: "User logged in successfully",
        user,
        token: token,
      });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { getAllUsers, getLoggedInUser, registerUser, loginUser };
