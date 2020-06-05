const bcrypt = require("bcrypt");

const User = require("../models/user");

const HttpError = require("../../src/utils/HttpError");
const { generateToken } = require("../../src/utils/auth");
const { getAll, getOne } = require("./utils/getters");

const getUsers = getAll(User, "password");

const getUser = getOne(User, "userId");

const createUser = async (req, res, next) => {
  const { email, username, password, fullname, summary, avatar_url } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(
      new HttpError(
        "Signing up failed: Account associated with this email already exists.",
        409
      )
    );
  }
  if (existingUser) {
    return next(
      new HttpError(
        "Signing up failed: Account associated with this email already exists.",
        409
      )
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Internal Server Error", 500));
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
    return next(new HttpError("Bad Gateway", 502));
  }

  let token;
  try {
    token = generateToken(createdUser);
  } catch (err) {
    return next(new HttpError("Internal Server Error", 500));
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
    return next(
      new HttpError(
        "Account associated with these credentials not found. Please try again.",
        404
      )
    );
  }
  if (!existingUser) {
    return next(
      new HttpError(
        "Account associated with these credentials not found. Please try again.",
        404
      )
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new HttpError(
        "Account associated with these credentials not found. Please try again.",
        422
      )
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError(
        "Account associated with these credentials not found. Please try again.",
        422
      )
    );
  }

  let token;
  try {
    token = generateToken(existingUser);
  } catch (err) {
    return next(new HttpError("Internal Server Error", 500));
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

const signInGoogle = async (req, res) => {
  const { email, username, password, fullname, summary, avatar_url } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.send(err);
  }

  let user;
  if (!existingUser) {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      return res.send(err);
    }

    user = new User({
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
      await user.save();
    } catch (err) {
      return res.send(err);
    }
  } else {
    user = existingUser;
  }

  let token;
  try {
    token = generateToken(user);
  } catch (err) {
    return res.send(err);
  }

  return res.status(200).json({
    userId: user.id,
    email: user.email,
    username: user.username,
    fullname: user.user_info.fullname,
    summary: user.user_info.summary,
    avatar_url: user.user_info.avatar_url,
    posts_count: user.posts_count,
    followers_count: user.followers_count,
    following_count: user.following_count,
    token,
  });
};

module.exports = { getUsers, getUser, createUser, signInUser, signInGoogle };
