/**
 * Handles REST requests for the recommendations feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getRecommendations = async (request, response) => {
  sendNotImplemented(response, "The recommendations feature");
};

module.exports = {
  getRecommendations,
};
