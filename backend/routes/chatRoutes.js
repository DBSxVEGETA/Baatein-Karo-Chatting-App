const express = require("express");
const { jwtVerify } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(jwtVerify, createChat).get(jwtVerify, fetchChats);
router.route("/group").post(jwtVerify, createGroupChat).put(jwtVerify, renameGroup);
router.route("/groupRemove").put(jwtVerify, removeFromGroup);
router.route("/groupAdd").put(jwtVerify, addToGroup);

module.exports = router;
