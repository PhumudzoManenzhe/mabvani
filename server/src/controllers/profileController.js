/**
 * Handles REST requests for the profile feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getProfile = async (request, response) => {
  sendNotImplemented(response, "The profile feature");
};

module.exports = {
  getProfile,
};
