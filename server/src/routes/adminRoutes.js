/**
 * Express route placeholder for admin.
 */
const express = require("express");
const { getAdminDashboard } = require("../controllers/adminController");

const router = express.Router();

router.get("/", getAdminDashboard);

module.exports = router;
