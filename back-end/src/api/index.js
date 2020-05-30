const express = require('express');

const project = require('../constants/project');
const user = require('./user');
const post = require('./post');
const story = require('./story');
const follow = require('./follow');

const router = express.Router();

router.use('/users', user);
router.use('/posts', post);
router.use('/stories', story);
router.use('/follows', follow);

router.get('/', (req, res) => {
  res.send({ message: project.message });
});

module.exports = router;
