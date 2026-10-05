const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  return res.json(users);
});

const searchUsers = asyncHandler(async (req, res) => {
  const search = req.query.search?.trim();

  if (!search) {
    return res.json([]);
  }

  const users = await User.find({
    _id: { $ne: req.user._id },
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  }).select("-password");

  return res.json(users);
});

const getLoggedInUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User with this id does not exist");
  }

  res.set("cache-control", "no-store");

  return res.status(200).json(user);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name?.trim() || !email?.trim() || !password) {
    res.status(400);
    throw new Error("Name, email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const userExists = await User.findOne({ email: normalizedEmail });

  if (userExists) {
    res.status(409);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    pic,
  });

  const token = user.generateToken();
  setAuthCookie(res, token);

  return res.status(201).json({
    message: "User created successfully",
    user: user.toSafeObject(),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = user.generateToken();
  setAuthCookie(res, token);

  return res.status(200).json({
    message: "User logged in successfully",
    user: user.toSafeObject(),
  });
});

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  getAllUsers,
  searchUsers,
  getLoggedInUser,
  registerUser,
  loginUser,
  logoutUser,
};
