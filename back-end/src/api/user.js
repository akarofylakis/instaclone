const express = require("express");

const { authenticateToken } = require("../utils/auth");

const {
  getUsers,
  getUser,
  createUser,
  signInUser,
} = require("../../db/controllers/user_controllers");

const { getUserLikes } = require("../../db/controllers/like_controllers");

const {
  followUser,
  unfollowUser,
  acceptFollow,
} = require("../../db/controllers/follow_controllers");

const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.get("/:userId", authenticateToken, getUser);
router.get("/:userId/likes", authenticateToken, getUserLikes);

router.put("/:userId/accept", authenticateToken, acceptFollow);

router.post("/:userId/follow", authenticateToken, followUser);
router.post("/signup", createUser);
router.post("/signin", signInUser);

router.delete("/:userId/unfollow", authenticateToken, unfollowUser);

module.exports = router;
