const Post = require('../models/post');
const HttpError = require('../../src/utils/HttpError');

const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find({});
  } catch (err) {
    return next(new HttpError('Fetching posts failed.', 500));
  }
  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

module.exports = { getPosts };
