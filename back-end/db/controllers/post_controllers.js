const HttpError = require("../../src/utils/HttpError");
const { idGetter } = require("./utils/snippets");

const Post = require("../models/post");
const User = require("../models/user");
const { getAll, getOne, getAllByUser, getFeed } = require("./utils/getters");

const getPosts = getAll(Post);
const getUserPosts = getAllByUser(Post);
const getPostsFeed = getFeed(Post);
const getPost = getOne(Post, "postId");

const createPost = async (req, res, next) => {
  const { imageUrl, caption, userId } = req.body;

  const user = await idGetter(User, userId, `Fetching user failed.`);

  const createdPost = new Post({
    image_url: imageUrl,
    caption,
    user,
  });

  try {
    await createdPost.save();
  } catch (err) {
    return next(new HttpError("Bad Gateway", 502));
  }

  const currentPosts = user.posts_count;
  user.posts_count = currentPosts + 1;

  try {
    await user.save();
  } catch (err) {
    return next(new HttpError("Bad Gateway", 502));
  }

  return res
    .status(201)
    .json({ createdPost: createdPost.toObject({ getters: true }) });
};

const updatePost = async (req, res, next) => {
  const { caption } = req.body;
  const { postId } = req.params;

  const post = await idGetter(
    Post,
    postId,
    `Updating post failed, please try again.`
  );

  if (post) {
    post.caption = caption;
  } else {
    return next(new HttpError("Post associated with this ID not found.", 404));
  }

  try {
    await post.save();
  } catch (err) {
    return next(new HttpError("Bad Gateway.", 502));
  }

  return res.status(200).json({ post: post.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;

  const post = await idGetter(
    Post,
    postId,
    `Deleting post failed, please try again.`
  );

  if (!post) {
    return next(new HttpError("Post associated with this ID not found.", 404));
  }

  try {
    await post.remove();
  } catch (err) {
    return next(new HttpError("Bad Gateway.", 502));
  }

  return res.status(200).json({ post: post.toObject({ getters: true }) });
};

module.exports = {
  getPosts,
  getPost,
  getUserPosts,
  getPostsFeed,
  updatePost,
  createPost,
  deletePost,
};
