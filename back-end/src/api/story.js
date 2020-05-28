const express = require('express');

const {
  getStories,
  getStory,
  getUserStories,
  getStoriesFeed,
  createStory,
  deleteStory,
} = require('../../db/controllers/story_controllers');

const router = express.Router();

router.get('/', getStories);
router.get('/:storyId', getStory);
router.get('/user/:userId/stories', getUserStories);
router.get('/feed/:userId', getStoriesFeed);

router.delete('/:storyId/delete', deleteStory);

router.post('/create', createStory);

module.exports = router;
