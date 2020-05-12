const express = require('express');

const {
  getPosts,
  getPost,
  getUserPosts,
  updatePost,
  createPost,
  deletePost,
} = require('../../db/controllers/post_controllers');

const {
  likePost,
  unlikePost,
} = require('../../db/controllers/like_controllers');

const router = express.Router();

router.get('/', getPosts);
router.get('/:postId', getPost);
router.get('/user/:userId/posts', getUserPosts);
router.put('/:postId/update', updatePost);
router.delete('/:postId/delete', deletePost);
router.delete('/:postId/unlike', unlikePost);
router.post('/:postId/like', likePost);
router.post('/create', createPost);

module.exports = router;
