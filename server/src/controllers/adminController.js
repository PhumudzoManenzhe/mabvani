/**
 * Handles REST requests for the admin feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getAdminDashboard = async (request, response) => {
  sendNotImplemented(response, "The admin feature");
};

module.exports = {
  getAdminDashboard,
};
