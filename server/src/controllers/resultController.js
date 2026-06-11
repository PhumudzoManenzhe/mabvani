/**
 * Handles REST requests for the results feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getResults = async (request, response) => {
  sendNotImplemented(response, "The results feature");
};

module.exports = {
  getResults,
};
