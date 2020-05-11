const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const HttpError = require('../../src/utils/HttpError');
const { getAll, getOne } = require('./utils/getters');

const getUsers = getAll(User, 'password');

const getUser = getOne(User, 'userId');

const createUser = async (req, res, next) => {
  const { email, username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Creating user failed, please try again.', 500));
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
    return next(new HttpError('Creating user failed, please try again.', 500));
  }

  const createdUser = new User({
    email,
    username,
    password: hashedPassword,
  });
  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError('Creating user failed, please try again.', 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Creating user failed, please try again.', 500));
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    username: createdUser.username,
    token,
  });
};

const signInUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Signing in failed, please try again.', 500));
  }
  if (!existingUser) {
    return next(new HttpError('Signing in failed, please try again.', 422));
  }

  let isValidPassword = false;
  try {
    isValidPassword = bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError('Signing in failed, please try again.', 422));
  }

  if (!isValidPassword) {
    return next(
      new HttpError('Invalid credentials, could not log you in.', 401)
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

  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    username: existingUser.username,
    token,
  });
};

module.exports = { getUsers, getUser, createUser, signInUser };
