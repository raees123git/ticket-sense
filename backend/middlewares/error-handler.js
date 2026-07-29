function errorHandler(error, request, response, next) {
  const statusCode = error.statusCode || 500;

  return response.status(statusCode).json({
    message: error.message || "Internal server error",
    statusCode: statusCode
  });
}

module.exports = errorHandler;