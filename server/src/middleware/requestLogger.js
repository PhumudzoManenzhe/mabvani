/**
 * Logs basic request information during development and on Render.
 */
const logger = require("../config/logger");

const requestLogger = (request, response, next) => {
  const startedAt = Date.now();

  response.on("finish", () => {
    logger.info(
      `${request.method} ${request.originalUrl} ${response.statusCode} ${Date.now() - startedAt}ms`
    );
  });

  next();
};

module.exports = requestLogger;
