/**
 * Handles REST requests for the documents feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getDocuments = async (request, response) => {
  sendNotImplemented(response, "The documents feature");
};

module.exports = {
  getDocuments,
};
