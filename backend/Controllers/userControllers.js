const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// const generateToken = require("../config/generateToken");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

const searchUsers = asyncHandler(async (req, res) => {
  const input = req.query.search
    ? {
        $or: [{ name: { $regex: req.query.search, $options: "i" } }, { email: { $regex: req.query.search, $options: "i" } }], // mongodb query to search the users which contain the input fields using regular expression
      }
    : {};

  const user = await User.find(input).find({ _id: { $ne: req.user._id } }); // finding all the users that has the input field in their name or email only the user which is logged in will not be included.
  if (!user) {
    return res.status(404).json({ message: "Users with this field not found" });
  }
  res.send(user);
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
      token: user.generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create a user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const token = user.generateToken(user._id);

  if (user && (await user.matchPassword(password))) {
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,
        secure: false, // <-- change this to false for local dev
        sameSite: "lax", // recommended for local dev
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

module.exports = { getAllUsers, searchUsers, getLoggedInUser, registerUser, loginUser };
