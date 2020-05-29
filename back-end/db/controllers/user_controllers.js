const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const HttpError = require('../../src/utils/HttpError');
const { getAll, getOne } = require('./utils/getters');

const getUsers = getAll(User, 'password');

const getUser = getOne(User, 'userId');

const createUser = async (req, res, next) => {
  const { email, username, password, fullname, summary, avatar_url } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Creating user failed, please try again.', 501));
  }
  if (existingUser) {
    return next(
      new HttpError(
        'Signing up failed: Account associated with this email already exists.',
        422
      )
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Creating user failed, please try again.', 502));
  }

  const createdUser = new User({
    email,
    username,
    password: hashedPassword,
    user_info: {
      fullname,
      summary,
      avatar_url,
    },
  });
  try {
    await createdUser.save();
  } catch (err) {
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Creating user failed, please try again.', 504));
  }

  return res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    username: createdUser.username,
    fullname: createdUser.user_info.fullname,
    summary: createdUser.user_info.summary,
    avatar_url: createdUser.user_info.avatar_url,
    posts_count: createdUser.posts_count,
    followers_count: createdUser.followers_count,
    following_count: createdUser.following_count,
    token,
  });
};

const signInUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Signing in failed, please try again.', 422));
  }
  if (!existingUser) {
    return next(new HttpError('Signing in failed, please try again.', 422));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError('Signing in failed, please try again.', 422));
  }

  if (!isValidPassword) {
    return next(
      new HttpError('Invalid credentials, could not log you in.', 422)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Signing in failed, please try again.', 500));
  }

  return res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    username: existingUser.username,
    fullname: existingUser.user_info.fullname,
    summary: existingUser.user_info.summary,
    avatar_url: existingUser.user_info.avatar_url,
    posts_count: existingUser.posts_count,
    followers_count: existingUser.followers_count,
    following_count: existingUser.following_count,
    token,
  });
};

module.exports = { getUsers, getUser, createUser, signInUser };
