/**
 * Shared JSON response helpers.
 */
const sendSuccess = (response, data = {}, statusCode = 200) =>
  response.status(statusCode).json({
    success: true,
    ...data,
  });

const sendNotImplemented = (response, featureName = "This feature") =>
  response.status(501).json({
    success: false,
    message: `${featureName} has not been implemented yet.`,
  });

module.exports = {
  sendSuccess,
  sendNotImplemented,
};
