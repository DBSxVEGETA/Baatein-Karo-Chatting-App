const express = require("express");
const router = express.Router();

const { getAllUsers, registerUser, authUser } = require("../Controllers/userControllers");

router.get("/", getAllUsers);
router.route("/register").post(registerUser);
router.post("/login", authUser);

module.exports = router;
