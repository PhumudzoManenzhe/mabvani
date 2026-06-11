/**
 * Handles REST requests for the programmes feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getProgrammes = async (request, response) => {
  sendNotImplemented(response, "The programmes feature");
};

module.exports = {
  getProgrammes,
};
