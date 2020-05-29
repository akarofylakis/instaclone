const HttpError = require('../../src/utils/HttpError');
const { idGetter } = require('./utils/snippets');

const User = require('../models/user');
const Follower = require('../models/follower');

const followUser = async (req, res, next) => {
  const { userId } = req.params;

  const { followerId } = req.body;

  const user = await idGetter(User, userId, `Fetching user failed.`);

  const follower = await idGetter(User, followerId, `Fetching user failed.`);

  if (!follower || !user) {
    return next(new HttpError('Following user failed, please try again.', 422));
  }

  if (followerId === userId) {
    return next(new HttpError('Following user failed, please try again.', 422));
  }

  let existingFollow;
  try {
    existingFollow = await Follower.findOne({
      follower,
      user,
    });
  } catch (err) {
    return next(new HttpError('Following user failed, please try again.', 422));
  }

  if (existingFollow) {
    return next(new HttpError('Following user failed, please try again.', 422));
  }

  const follow = new Follower({
    user,
    follower,
    status: false,
  });

  try {
    await follow.save();
  } catch (err) {
    return next(new HttpError('Following user failed, please try again.', 500));
  }

  const currentFollowing = follower.following_count;
  const currentFollowers = user.followers_count;
  follower.following_count = currentFollowing + 1;
  user.followers_count = currentFollowers + 1;

  try {
    await user.save();
    await follower.save();
  } catch (err) {
    return next(new HttpError('Creating post failed, please try again.', 422));
  }

  return res.status(201).json({ follow: follow.toObject({ getters: true }) });
};

const unfollowUser = async (req, res, next) => {
  const { userId } = req.params;

  const { followerId } = req.body;

  const user = await idGetter(
    User,
    userId,
    `Unfollowing user failed, please try again.`
  );

  const follower = await idGetter(
    User,
    followerId,
    `Unfollowing user failed, please try again.`
  );

  if (!follower || !user) {
    return next(new HttpError('Following user failed, please try again.', 422));
  }

  let follow;
  try {
    follow = await Follower.findOne({ follower, user });
  } catch (err) {
    return next(
      new HttpError('UnFollowing user failed, please try again.', 422)
    );
  }

  if (!follow) {
    return next(
      new HttpError('UnFollowing user failed, please try again.', 422)
    );
  }

  try {
    await follow.remove();
  } catch (err) {
    return next(
      new HttpError('UnFollowing user failed, please try again.', 500)
    );
  }

  const currentFollowing = follower.following_count;
  const currentFollowers = user.followers_count;
  follower.following_count = currentFollowing - 1;
  user.followers_count = currentFollowers - 1;

  try {
    await user.save();
    await follower.save();
  } catch (err) {
    return next(new HttpError('Creating post failed, please try again.', 422));
  }

  return res.status(200).json({ follow: follow.toObject({ getters: true }) });
};

const acceptFollow = async (req, res, next) => {
  const followerId = req.params.userId;

  const { userId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError('Accepting user failed, please try again.', 422));
  }

  let follower;
  try {
    follower = await User.findById(followerId);
  } catch (err) {
    return next(new HttpError('Accepting user failed, please try again.', 422));
  }

  let existingFollow;
  try {
    existingFollow = await Follower.findOne({
      follower,
      user,
      status: false,
    });
  } catch (err) {
    return next(new HttpError('Accepting user failed, please try again.', 500));
  }

  if (!existingFollow) {
    return next(new HttpError('Accepting user failed, please try again.', 500));
  }

  existingFollow.status = true;

  try {
    await existingFollow.save();
  } catch (err) {
    return next(new HttpError('Accepting user failed, please try again.', 500));
  }

  return res
    .status(201)
    .json({ follow: existingFollow.toObject({ getters: true }) });
};

module.exports = { followUser, unfollowUser, acceptFollow };
