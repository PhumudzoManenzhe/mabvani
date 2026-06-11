/**
 * Express route placeholder for application.
 */
const express = require("express");
const { getApplications } = require("../controllers/applicationController");

const router = express.Router();

router.get("/", getApplications);

module.exports = router;
