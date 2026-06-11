/**
 * Handles REST requests for the applications feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getApplications = async (request, response) => {
  sendNotImplemented(response, "The applications feature");
};

module.exports = {
  getApplications,
};
