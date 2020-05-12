const HttpError = require('../../../src/utils/HttpError');

const User = require('../../models/user');

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
      return next(new HttpError(`Fetching ${collection}s failed.`, 500));
    }
    res.json({
      data: data.map((document) => document.toObject({ getters: true })),
    });
  };
};

const getAllByUser = (collection, exclude) => {
  return async (req, res, next) => {
    const userId = req.params.userId;

    console.log(userId);

    let user;
    try {
      user = await User.findById(userId);
    } catch (err) {
      return next(new HttpError(`Fetching ${collection}s failed.`, 500));
    }

    let data;
    try {
      if (exclude) {
        data = await collection.find({ user: user }, `-${exclude}`);
      } else {
        data = await collection.find({ user: user });
      }
    } catch (err) {
      return next(new HttpError(`Fetching ${collection}s failed.`, 500));
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
    try {
      data = await collection.findById(id);
    } catch (err) {
      return next(new HttpError(`Fetching ${collection} failed.`, 500));
    }
    res.json({
      data: data.toObject({ getters: true }),
    });
  };
};

module.exports = { getAll, getOne, getAllByUser };
