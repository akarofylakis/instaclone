const errorHandler = (error, req, res, next) => {
  const statusCode = error.code || 404;
  const message = error.message || `Not found - ${req.originalUrl}`;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: message,
  });
};

module.exports = {
  errorHandler,
};
