const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : 'Server error.';
  return res.status(statusCode).json({ message });
};

module.exports = errorHandler;
