/**
 * Handles REST requests for the cart feature.
 */
const { sendNotImplemented } = require("../utils/response");

const getCart = async (request, response) => {
  sendNotImplemented(response, "The cart feature");
};

module.exports = {
  getCart,
};
