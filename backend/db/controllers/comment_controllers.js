const HttpError = require('../../src/utils/HttpError');

const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

const commentPost = async (req, res, next) => {
  const postId = req.params.postId;

  const { userId, body } = req.body;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    return next(
      new HttpError('Commenting post failed, please try again.', 422)
    );
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError('Commenting post failed, please try again.', 422)
    );
  }

  const comment = new Comment({
    body,
    user,
    post,
  });

  try {
    await comment.save();
  } catch (err) {
    return next(
      new HttpError('Commenting post failed, please try again.', 422)
    );
  }

  res.status(201).json({ comment: comment.toObject({ getters: true }) });
};

const updateComment = async (req, res, next) => {
  const commentId = req.params.commentId;

  const { body } = req.body;

  let comment;
  try {
    comment = await Comment.findById(commentId);
  } catch (err) {
    return next(
      new HttpError('Updating comment failed, please try again.', 422)
    );
  }

  if (!comment) {
    return next(
      new HttpError('Updating comment failed, please try again.', 422)
    );
  }

  comment.body = body;

  try {
    await comment.save();
  } catch (err) {
    return next(
      new HttpError('Updating comment failed, please try again.', 500)
    );
  }

  res.status(200).json({ comment: comment.toObject({ getters: true }) });
};

const deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;

  let comment;
  try {
    comment = await Comment.findById(commentId);
  } catch (err) {
    return next(
      new HttpError('Deleting comment failed, please try again.', 422)
    );
  }

  if (!comment) {
    return next(
      new HttpError('Deleting comment failed, please try again.', 422)
    );
  }

  try {
    await comment.remove();
  } catch (err) {
    return next(
      new HttpError('Deleting comment failed, please try again.', 500)
    );
  }

  res.status(200).json({ comment: comment.toObject({ getters: true }) });
};

module.exports = { commentPost, updateComment, deleteComment };
