const HttpError = require('../../src/utils/HttpError');
const { idGetter } = require('./utils/snippets');

const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

const commentPost = async (req, res, next) => {
  const postId = req.params.postId;

  const { userId, body } = req.body;

  let post;
  post = await idGetter(
    Post,
    postId,
    `Commenting post failed, please try again.`
  );

  let user;
  user = await idGetter(User, userId, `Fetching user failed.`);

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
  comment = await idGetter(
    Comment,
    commentId,
    `Updating comment failed, please try again.`
  );

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
  comment = await idGetter(
    Comment,
    commentId,
    `Deleting comment failed, please try again.`
  );

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
