/**
 * Health-check routes for Render and local development.
 */
const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
  response.status(200).json({
    success: true,
    message: "UniApply SA API is running.",
  });
});

module.exports = router;
