const HttpError = require('../../../src/utils/HttpError');
const { idGetter } = require('./snippets');

const User = require('../../models/user');
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
    res.json({
      data: data.map((document) => document.toObject({ getters: true })),
    });
  };
};

const getAllByUser = (collection, exclude) => {
  return async (req, res, next) => {
    const userId = req.params.userId;

    let user;
    user = await idGetter(User, userId, `Fetching user failed.`);

    if (!user) {
      return next(new HttpError(`Fetching data failed.`, 422));
    }

    let data;
    try {
      if (exclude) {
        data = await collection.find({ user: user }, `-${exclude}`);
      } else {
        data = await collection.find({ user: user });
      }
    } catch (err) {
      return next(new HttpError(`Fetching data failed.`, 500));
    }
    res.json({
      data: data.map((document) => document.toObject({ getters: true })),
    });
  };
};

const getOne = (collection, param) => {
  return async (req, res, next) => {
    const id = req.params[param];

    let data;
    data = await idGetter(collection, id, `Fetching data failed.`);

    if (!data) {
      return next(new HttpError(`Fetching data failed.`, 422));
    }

    res.json({
      data: data.toObject({ getters: true }),
    });
  };
};

const getFeed = (collection) => {
  return async (req, res, next) => {
    const userId = req.params.userId;

    let user;
    user = await idGetter(User, userId, `Fetching user failed.`);

    let following;
    try {
      following = await Follow.find({ follower: user, status: true });
    } catch (err) {
      return next(new HttpError(`Fetching data failed.`, 500));
    }

    let feed = await following.reduce(async (accum, userFollowing) => {
      const current = await accum;
      let userData;
      try {
        userData = await collection.find({
          user: userFollowing.user,
        });
      } catch (err) {
        return next(new HttpError(`Fetching data failed.`, 500));
      }

      if (userData) {
        current.push(userData);
      }

      return current;
    }, []);

    res.json({
      feed: feed[0].map((document) => document.toObject({ getters: true })),
    });
  };
};

module.exports = { getAll, getOne, getAllByUser, getFeed };
