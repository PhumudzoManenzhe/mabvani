/**
 * Standard API error object used by middleware and controllers.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;
