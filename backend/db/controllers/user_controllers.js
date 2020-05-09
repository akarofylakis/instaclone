const User = require('../models/user');
const HttpError = require('../../src/utils/HttpError');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return next(new HttpError('Fetching users failed.', 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

module.exports = { getUsers };
