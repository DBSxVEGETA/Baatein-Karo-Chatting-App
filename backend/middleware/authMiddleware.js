const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const jwtVerify = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers["Authorization"]?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken?.payload?.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not able to verify token" });
  }
});

module.exports = { jwtVerify };
