const HttpError = require('../../src/utils/HttpError');

const Post = require('../models/post');
const User = require('../models/user');
const { getAll, getOne } = require('./utils/getters');

const getPosts = getAll(Post);
const getPost = getOne(Post, 'postId');

const createPost = async (req, res, next) => {
  const { imageUrl, caption, userId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError('Creating post failed, please try again.', 422));
  }

  const createdPost = new Post({
    image_url: imageUrl,
    caption,
    user,
  });

  try {
    await createdPost.save();
  } catch (err) {
    return next(err);
  }

  res.status(201).json({ createdPost });
};

module.exports = { getPosts, getPost, createPost };
