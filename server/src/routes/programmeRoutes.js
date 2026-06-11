/**
 * Express route placeholder for programme.
 */
const express = require("express");
const { getProgrammes } = require("../controllers/programmeController");

const router = express.Router();

router.get("/", getProgrammes);

module.exports = router;
