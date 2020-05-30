const HttpError = require('../../../src/utils/HttpError');
const { idGetter } = require('./snippets');

const User = require('../../models/user');
const Post = require('../../models/post');
const Follow = require('../../models/follower');

const getAll = (collection, exclude) => {
  return async (req, res, next) => {
    let data;
    try {
      if (exclude) {
        data = await collection.find({}, `-${exclude}`);
      } else {
        data = await collection.find({});
      }
    } catch (err) {
      return next(new HttpError(`Fetching data failed.`, 500));
    }

    const dataWithUser = await Promise.all(
      data.map(async (document) => {
        if (document.user) {
          document.user = await User.findById(document.user);
        }
        return document;
      })
    );

    return res.json({
      data: dataWithUser.map((document) =>
        document.toObject({ getters: true })
      ),
    });
  };
};

const getAllByUser = (collection, exclude, customUserField) => {
  return async (req, res, next) => {
    const { userId } = req.params;

    const user = await idGetter(User, userId, `Fetching user failed.`);

    if (!user) {
      return next(new HttpError(`Fetching data failed.`, 422));
    }

    let data;
    try {
      if (exclude) {
        if (customUserField) {
          data = await collection.find(
            { [customUserField]: user },
            `-${exclude}`
          );
        } else {
          data = await collection.find({ user }, `-${exclude}`);
        }
      } else {
        if (customUserField) {
          data = await collection.find({ [customUserField]: user });
        } else {
          data = await collection.find({ user });
        }
      }
    } catch (err) {
      return next(new HttpError(`Fetching data failed.`, 500));
    }
    return res.json({
      data: data.map((document) => document.toObject({ getters: true })),
    });
  };
};

const getAllByPost = (collection) => {
  return async (req, res, next) => {
    const { postId } = req.params;

    const post = await idGetter(Post, postId, `Fetching user failed.`);

    if (!post) {
      return next(new HttpError(`Fetching data failed.`, 422));
    }

    let data;
    try {
      data = await collection.find({ post });
    } catch (err) {
      return next(new HttpError(`Fetching data failed.`, 500));
    }

    const dataWithUser = await Promise.all(
      data.map(async (document) => {
        if (document.user) {
          document.user = await User.findById(document.user);
        }
        return document;
      })
    );

    return res.json({
      data: dataWithUser.map((document) =>
        document.toObject({ getters: true })
      ),
    });
  };
};

const getOne = (collection, param) => {
  return async (req, res, next) => {
    const id = req.params[param];

    const data = await idGetter(collection, id, `Fetching data failed.`);

    if (!data) {
      return next(new HttpError(`Fetching data failed.`, 422));
    }

    data.user = await User.findById(data.user);

    return res.json({
      data: data.toObject({ getters: true }),
    });
  };
};

const getFeed = (collection) => {
  return async (req, res, next) => {
    const { userId } = req.params;

    const user = await idGetter(User, userId, `Fetching user failed.`);
    let ownPosts;

    try {
      ownPosts = await collection.find({
        user,
      });
    } catch (err) {
      return next(new HttpError(`Fetching data failed.`, 500));
    }

    let following;
    try {
      following = await Follow.find({ follower: user, status: false });
    } catch (err) {
      return next(new HttpError(`Fetching data failed.`, 500));
    }

    let feed = await following.reduce(async (accum, userFollowing) => {
      let userData;

      try {
        userData = await collection.find({
          user: userFollowing.user,
        });
      } catch (err) {
        return next(new HttpError(`Fetching data failed.`, 502));
      }

      if (userData) {
        return userData;
      }
    }, []);

    feed = feed.concat(ownPosts);

    const feedWithUser = await Promise.all(
      feed.map(async (document) => {
        if (document.user) {
          document.user = await User.findById(document.user);
        }
        return document;
      })
    );

    try {
      res.json({
        feed: feedWithUser.map((document) =>
          document.toObject({ getters: true })
        ),
      });
    } catch (e) {
      return next(new HttpError(`Fetching data failed.`, 503));
    }
  };
};

module.exports = { getAll, getOne, getAllByUser, getFeed, getAllByPost };
