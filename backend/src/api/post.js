const express = require('express');

const {
  getPosts,
  getPost,
  createPost,
} = require('../../db/controllers/post_controllers');

const router = express.Router();

router.get('/', getPosts);
router.get('/:postId', getPost);
router.post('/create', createPost);

module.exports = router;
