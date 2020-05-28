const HttpError = require('../../src/utils/HttpError');
const { idGetter } = require('./utils/snippets');
const { getAllByUser } = require('./utils/getters');

const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');

const getUserLikes = getAllByUser(Like);

const likePost = async (req, res, next) => {
  const { postId } = req.params;

  const { userId } = req.body;

  const post = await idGetter(
    Post,
    postId,
    `Liking post failed, please try again.`
  );

  const user = await idGetter(User, userId, `Fetching user failed.`);

  let existinglike;
  try {
    existinglike = await Like.findOne({ post, user });
  } catch (err) {
    return next(new HttpError('Liking post failed, please try again.', 500));
  }

  if (existinglike) {
    return next(new HttpError('Liking post failed, please try again.', 500));
  }

  const like = new Like({
    user,
    post,
  });

  try {
    await like.save();
  } catch (err) {
    return next(new HttpError('Liking post failed, please try again.', 422));
  }

  const postLikes = post.likes_count;
  post.likes_count = postLikes + 1;
  try {
    await post.save();
  } catch (err) {
    return next(new HttpError('Liking post failed, please try again.', 500));
  }

  return res.status(201).json({ like: like.toObject({ getters: true }) });
};

const unlikePost = async (req, res, next) => {
  const { postId } = req.params;

  const { userId } = req.body;

  const post = await idGetter(
    Post,
    postId,
    `Unliking post failed, please try again.`
  );

  const user = await idGetter(User, userId, `Fetching user failed.`);

  let like;
  try {
    like = await Like.findOne({ post, user });
  } catch (err) {
    return next(new HttpError('Unliking post failed, please try again.', 422));
  }

  if (!like) {
    return next(new HttpError('Unliking post failed, please try again.', 422));
  }

  try {
    await like.remove();
  } catch (err) {
    return next(new HttpError('Unliking post failed, please try again.', 500));
  }

  const postLikes = post.likes_count;
  post.likes_count = postLikes - 1;
  try {
    await post.save();
  } catch (err) {
    return next(new HttpError('Unliking post failed, please try again.', 500));
  }

  return res.status(200).json({ like: like.toObject({ getters: true }) });
};

module.exports = { getUserLikes, likePost, unlikePost };
