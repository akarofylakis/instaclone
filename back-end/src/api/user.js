const express = require("express");
const { check } = require("express-validator");

const { authenticateToken } = require("../utils/auth");

const {
  getUsers,
  getUser,
  createUser,
  signInUser,
  signInGoogle,
} = require("../../db/controllers/user_controllers");

const { getUserLikes } = require("../../db/controllers/like_controllers");

const {
  followUser,
  unfollowUser,
  acceptFollow,
} = require("../../db/controllers/follow_controllers");

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", authenticateToken, getUser);
router.get("/:userId/likes", authenticateToken, getUserLikes);

router.put("/:userId/accept", authenticateToken, acceptFollow);

router.post("/:userId/follow", authenticateToken, followUser);
router.post(
  "/signup",
  [
    check("email").isEmail().normalizeEmail(),
    check("username").isLength({ min: 4, max: 55 }),
    check("password").isLength({ min: 6, max: 500 }),
    check("fullname").isLength({ max: 55 }),
    check("summary").isLength({ max: 500 }),
    check("avatar").isLength({ max: 500 }),
  ],
  createUser
);
router.post(
  "/signin",
  [
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 6, max: 500 }),
  ],
  signInUser
);

router.post(
  "/google",
  [
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 6, max: 500 }),
  ],
  signInGoogle
);

router.delete("/:userId/unfollow", authenticateToken, unfollowUser);

module.exports = router;
