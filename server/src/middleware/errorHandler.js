/**
 * Central Express error handler.
 */
const logger = require("../config/logger");

const errorHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  const statusCode = error.statusCode || 500;

  logger.error(error);

  response.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "An unexpected server error occurred." : error.message,
  });
};

module.exports = errorHandler;
