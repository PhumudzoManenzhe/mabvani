/**
 * Express route placeholder for result.
 */
const express = require("express");
const { getResults } = require("../controllers/resultController");

const router = express.Router();

router.get("/", getResults);

module.exports = router;
