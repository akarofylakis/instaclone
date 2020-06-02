const HttpError = require("../../src/utils/HttpError");
const { idGetter } = require("./utils/snippets");
const { getAllByPost } = require("./utils/getters");

const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

const getPostComments = getAllByPost(Comment);

const commentPost = async (req, res, next) => {
  const { postId } = req.params;

  const { userId, body } = req.body;

  const post = await idGetter(
    Post,
    postId,
    `Commenting post failed, please try again.`
  );

  const user = await idGetter(User, userId, `Fetching user failed.`);

  const comment = new Comment({
    body,
    user,
    post,
  });

  try {
    await comment.save();
  } catch (err) {
    return next(new HttpError("Bad Gateway.", 502));
  }

  const postComments = post.comments_count;
  post.comments_count = postComments + 1;
  try {
    await post.save();
  } catch (err) {
    return next(new HttpError("Bad Gateway.", 502));
  }

  return res.status(201).json({ comment: comment.toObject({ getters: true }) });
};

const updateComment = async (req, res, next) => {
  const { commentId } = req.params;

  const { body } = req.body;

  const comment = await idGetter(
    Comment,
    commentId,
    `Data associated with this request not found.`
  );

  if (!comment) {
    return next(
      new HttpError("Data associated with this request not found.", 422)
    );
  }

  comment.body = body;

  try {
    await comment.save();
  } catch (err) {
    return next(new HttpError("Bad Gateway.", 502));
  }

  return res.status(200).json({ comment: comment.toObject({ getters: true }) });
};

const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { postId, userId } = req.body;

  const comment = await idGetter(
    Comment,
    commentId,
    `Data associated with this request not found.`
  );

  const post = await idGetter(
    Post,
    postId,
    `Data associated with this request not found.`
  );

  if (!comment) {
    return next(
      new HttpError("Data associated with this request not found.", 404)
    );
  }

  if (new String(userId).valueOf() !== new String(comment.user).valueOf()) {
    return next(new HttpError("Unathorized to remove comment", 401));
  }

  try {
    await comment.remove();
  } catch (err) {
    return next(new HttpError("Bad Gateway.", 502));
  }

  const postComments = post.comments_count;
  post.comments_count = postComments - 1;
  try {
    await post.save();
  } catch (err) {
    return next(new HttpError("Bad Gateway.", 502));
  }

  return res.status(200).json({ comment: comment.toObject({ getters: true }) });
};

module.exports = { commentPost, updateComment, deleteComment, getPostComments };
