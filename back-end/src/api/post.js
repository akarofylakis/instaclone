const express = require("express");
const { check } = require("express-validator");

const {
  getPosts,
  getPost,
  getPostsFeed,
  getUserPosts,
  updatePost,
  createPost,
  deletePost,
} = require("../../db/controllers/post_controllers");

const {
  likePost,
  unlikePost,
} = require("../../db/controllers/like_controllers");

const {
  commentPost,
  updateComment,
  deleteComment,
  getPostComments,
} = require("../../db/controllers/comment_controllers");

const router = express.Router();

router.get("/", getPosts);
router.get("/feed/:userId", getPostsFeed);
router.get("/user/:userId/posts", getUserPosts);
router.get("/:postId/comments", getPostComments);
router.get("/:postId", getPost);

router.put("/:postId/update", updatePost);
router.put("/comment/:commentId/update", updateComment);

router.delete("/:postId/delete", deletePost);
router.delete("/comment/:commentId/delete", deleteComment);
router.delete("/:postId/unlike", unlikePost);

router.post("/:postId/like", likePost);
router.post(
  "/create",
  [
    check("userId").not().isEmpty(),
    check("imageUrl").not().isEmpty(),
    check("caption").isLength({ max: 500 }),
  ],
  createPost
);
router.post("/:postId/comment", commentPost);

module.exports = router;
