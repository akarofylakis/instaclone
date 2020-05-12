const express = require('express');

const {
  getStory,
  getUserStories,
  createStory,
  deleteStory,
} = require('../../db/controllers/story_controllers');

const router = express.Router();

router.get('/:storyId', getStory);
router.get('/user/:userId/stories', getUserStories);
router.delete('/:storyId/delete', deleteStory);
router.post('/create', createStory);

module.exports = router;
