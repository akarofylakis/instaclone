const HttpError = require("../../../src/utils/HttpError");

const idGetter = async (collection, id, errorMessage) => {
  let instance;
  try {
    instance = await collection.findById(id);
  } catch (err) {
    return new HttpError(errorMessage, 404);
  }

  return instance;
};

module.exports = {
  idGetter,
};
