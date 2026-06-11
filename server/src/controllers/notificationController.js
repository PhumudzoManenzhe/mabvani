/**
 * Handles REST requests for the notifications feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getNotifications = async (request, response) => {
  sendNotImplemented(response, "The notifications feature");
};

module.exports = {
  getNotifications,
};
