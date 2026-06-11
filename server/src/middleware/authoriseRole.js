/**
 * Role authorisation placeholder.
 * Roles will be read from Render PostgreSQL user records, not frontend input.
 */
const ApiError = require("../utils/ApiError");

const authoriseRole = (...allowedRoles) => (request, response, next) => {
  const role = request.appUser?.role;

  if (!role || !allowedRoles.includes(role)) {
    next(new ApiError(403, "You are not allowed to access this resource."));
    return;
  }

  next();
};

module.exports = authoriseRole;
