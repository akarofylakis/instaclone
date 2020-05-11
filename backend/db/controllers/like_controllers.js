const HttpError = require('../../src/utils/HttpError');

const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');

const likePost = async (req, res, next) => {
  const postId = req.params.postId;

  const { userId } = req.body;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    return next(new HttpError('Liking post failed, please try again.', 422));
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError('Liking post failed, please try again.', 422));
  }

  let existinglike;
  try {
    existinglike = await Like.findOne({ post: post, user: user });
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

  res.status(201).json({ like: like.toObject({ getters: true }) });
};

const unlikePost = async (req, res, next) => {
  const postId = req.params.postId;

  const { userId } = req.body;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    return next(new HttpError('Unliking post failed, please try again.', 422));
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError('Unliking post failed, please try again.', 422));
  }

  let like;
  try {
    like = await Like.findOne({ post: post, user: user });
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

  res.status(200).json({ like: like.toObject({ getters: true }) });
};

module.exports = { likePost, unlikePost };
