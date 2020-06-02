const errorHandler = (err, req, res, next) => {
  res.status(err.code || 404);
  res.json({
    status: err.code || 404,
    message: err.message || `Not found - ${req.originalUrl}`,
  });
};

module.exports = {
  errorHandler,
};
