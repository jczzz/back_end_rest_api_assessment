
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  res.status(error.statusCode || 400).json({
    error: error.message || "Request Parameter Error",
  });
};

module.exports = errorHandler;