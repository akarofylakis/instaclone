const express = require('express');

const { getPosts } = require('../../db/controllers/post_controllers');

const router = express.Router();

router.get('/', getPosts);

module.exports = router;
