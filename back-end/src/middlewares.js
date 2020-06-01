const errorHandler = (error, req, res) => {
  const statusCode = error.code || 404;
  const message = error.message || `Not found - ${req.originalUrl}`;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message,
  });
};

module.exports = {
  errorHandler,
};
