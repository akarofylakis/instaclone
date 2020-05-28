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

const getAllByUser = (collection, exclude) => {
  return async (req, res, next) => {
    const { userId } = req.params;

    const user = await idGetter(User, userId, `Fetching user failed.`);

    if (!user) {
      return next(new HttpError(`Fetching data failed.`, 422));
    }

    let data;
    try {
      if (exclude) {
        data = await collection.find({ user }, `-${exclude}`);
      } else {
        data = await collection.find({ user });
      }
    } catch (err) {
      return next(new HttpError(`Fetching data failed.`, 500));
    }
    return res.json({
      data: data.map((document) => document.toObject({ getters: true })),
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

    let following;
    try {
      following = await Follow.find({ follower: user, status: true });
    } catch (err) {
      return next(new HttpError(`Fetching data failed.`, 500));
    }

    const feed = await following.reduce(async (accum, userFollowing) => {
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

    try {
      res.json({
        feed: feed[0].map((document) => document.toObject({ getters: true })),
      });
    } catch (e) {
      return next(new HttpError(`Fetching data failed.`, 500));
    }
  };
};

module.exports = { getAll, getOne, getAllByUser, getFeed };
