const express = require("express");
const { jwtVerify } = require("../middleware/authMiddleware");
const router = express.Router();
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../Controllers/chatControllers");

router.route("/").post(jwtVerify, accessChat);
router.route("/").get(jwtVerify, fetchChats);
router.route("/group").post(jwtVerify, createGroupChat);
router.route("/group").put(jwtVerify, renameGroup);
router.route("/groupRemove").put(jwtVerify, removeFromGroup);
router.route("/groupAdd").put(jwtVerify, addToGroup);

module.exports = router;
