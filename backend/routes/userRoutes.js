const express = require("express");
const router = express.Router();

const { getAllUsers, getUser, registerUser, loginUser } = require("../Controllers/userControllers");

router.get("/", getAllUsers);
router.get("/getUser", getUser);
router.route("/register").post(registerUser);
router.post("/login", loginUser);

module.exports = router;
