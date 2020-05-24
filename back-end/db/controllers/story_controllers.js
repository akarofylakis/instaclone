const HttpError = require('../../src/utils/HttpError');
const { idGetter } = require('./utils/snippets');

const Story = require('../models/story');
const User = require('../models/user');
const { getOne, getAllByUser, getFeed } = require('./utils/getters');

const getUserStories = getAllByUser(Story);
const getStoriesFeed = getFeed(Story);
const getStory = getOne(Story, 'storyId');

const createStory = async (req, res, next) => {
  const { sourceUrl, userId } = req.body;

  let user;
  user = await idGetter(User, userId, `Fetching user failed.`);

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
  story = await idGetter(
    Story,
    storyId,
    `Deleting story failed, please try again.`
  );

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
  getStoriesFeed,
  createStory,
  deleteStory,
};
