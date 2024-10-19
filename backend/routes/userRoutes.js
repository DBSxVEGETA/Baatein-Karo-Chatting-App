const express = require("express");
const router = express.Router();
const { jwtVerify } = require("../middleware/authMiddleware");

const { getAllUsers, searchUsers, getLoggedInUser, registerUser, loginUser } = require("../Controllers/userControllers");

router.get("/", getAllUsers);
router.get("/searchUsers", jwtVerify, searchUsers);
router.get("/getUser", jwtVerify, getLoggedInUser);
router.route("/register").post(registerUser);
router.post("/login", loginUser);

module.exports = router;
