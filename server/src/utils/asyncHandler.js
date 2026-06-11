/**
 * Wraps async route handlers and forwards errors to Express.
 */
const asyncHandler = (handler) => (request, response, next) =>
  Promise.resolve(handler(request, response, next)).catch(next);

module.exports = asyncHandler;
