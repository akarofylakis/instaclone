const express = require('express');

const {
  getPosts,
  getPost,
  getPostsFeed,
  getUserPosts,
  updatePost,
  createPost,
  deletePost,
} = require('../../db/controllers/post_controllers');

const {
  likePost,
  unlikePost,
} = require('../../db/controllers/like_controllers');

const {
  commentPost,
  updateComment,
  deleteComment,
} = require('../../db/controllers/comment_controllers');

const router = express.Router();

router.get('/', getPosts);
router.get('/feed/:userId', getPostsFeed);
router.get('/user/:userId/posts', getUserPosts);
router.get('/:postId', getPost);

router.put('/:postId/update', updatePost);
router.put('/comment/:commentId/update', updateComment);

router.delete('/:postId/delete', deletePost);
router.delete('/comment/:commentId/delete', deleteComment);
router.delete('/:postId/unlike', unlikePost);

router.post('/:postId/like', likePost);
router.post('/create', createPost);
router.post('/:postId/comment', commentPost);

module.exports = router;
