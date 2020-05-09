const User = require('../models/user');
const Post = require('../models/post');

const createUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById('5eb6b6394aadc51454980b97');
  } catch (err) {
    console.log(err);
  }
  const createdPost = new Post({
    image_url: '213213',
    caption: '1232132132133',
    user_id: user,
  });
  try {
    await createdPost.save();
  } catch (err) {
    return err;
  }

  return {
    id: createdPost.id,
    email: createdPost.email,
    username: createdPost.username,
    password: createdPost.password,
  };
};

const createPost = async (req, res, next) => {
  let user;
  try {
    user = await User.findById('5eb6bde6631e8f73c18a63ec');
  } catch (err) {
    console.log(err);
  }

  const createdPost = new Post({
    image_url: '213213421231',
    caption: '1232132132133421',
    user_id: user,
  });

  try {
    await createdPost.save();
  } catch (err) {
    return err;
  }

  return {
    id: createdPost.id,
    email: createdPost.email,
    username: createdPost.username,
    password: createdPost.password,
  };
};

module.exports = createPost;
