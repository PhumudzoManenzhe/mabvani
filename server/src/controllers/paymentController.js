/**
 * Handles REST requests for the payments feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getPayments = async (request, response) => {
  sendNotImplemented(response, "The payments feature");
};

module.exports = {
  getPayments,
};
