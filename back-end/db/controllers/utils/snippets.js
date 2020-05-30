const idGetter = async (collection, id, errorMessage) => {
  let instance;
  try {
    instance = await collection.findById(id);
  } catch (err) {
    return;
  }

  return instance;
};

module.exports = {
  idGetter,
};
