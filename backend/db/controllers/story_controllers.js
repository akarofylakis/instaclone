const HttpError = require('../../src/utils/HttpError');

const Story = require('../models/story');
const User = require('../models/user');
const { getOne, getAllByUser } = require('./utils/getters');

const getUserStories = getAllByUser(Story);
const getStory = getOne(Story, 'storyId');

const createStory = async (req, res, next) => {
  const { sourceUrl, userId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError('Creating story failed, please try again.', 422));
  }

  const createdStory = new Story({
    source_url: sourceUrl,
    user,
  });

  try {
    await createdStory.save();
  } catch (err) {
    return next(new HttpError('Creating story failed, please try again.', 422));
  }

  res
    .status(201)
    .json({ createdStory: createdStory.toObject({ getters: true }) });
};

const deleteStory = async (req, res, next) => {
  const storyId = req.params.storyId;

  let story;
  try {
    story = await Story.findById(storyId);
  } catch (err) {
    return next(new HttpError('Deleting story failed, please try again.', 422));
  }

  if (!story) {
    return next(new HttpError('Deleting story failed, please try again.', 422));
  }

  try {
    await story.remove();
  } catch (err) {
    return next(new HttpError('Deleting story failed, please try again.', 500));
  }

  res.status(200).json({ story: story.toObject({ getters: true }) });
};

module.exports = {
  getStory,
  getUserStories,
  createStory,
  deleteStory,
};
