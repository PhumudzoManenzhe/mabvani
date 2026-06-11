/**
 * Request validation middleware placeholder.
 */
const validateRequest = (validator) => (request, response, next) => {
  if (!validator) {
    next();
    return;
  }

  const result = validator(request);

  if (result?.error) {
    response.status(400).json({
      success: false,
      message: result.error,
    });
    return;
  }

  next();
};

module.exports = validateRequest;
