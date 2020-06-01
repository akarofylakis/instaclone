const express = require("express");

const { authenticateToken } = require("../utils/auth");

const project = require("../constants/project");

const user = require("./user");
const post = require("./post");
const story = require("./story");
const follow = require("./follow");

const router = express.Router();

router.use("/users", user);
router.use("/posts", authenticateToken, post);
router.use("/stories", authenticateToken, story);
router.use("/follows", authenticateToken, follow);

router.get("/", (req, res) => {
  res.send({ message: project.message });
});

module.exports = router;
