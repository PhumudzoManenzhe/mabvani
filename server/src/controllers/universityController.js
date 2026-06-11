/**
 * Handles REST requests for the universities feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getUniversities = async (request, response) => {
  sendNotImplemented(response, "The universities feature");
};

module.exports = {
  getUniversities,
};
