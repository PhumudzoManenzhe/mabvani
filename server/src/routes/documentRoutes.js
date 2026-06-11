/**
 * Express route placeholder for document.
 */
const express = require("express");
const { getDocuments } = require("../controllers/documentController");

const router = express.Router();

router.get("/", getDocuments);

module.exports = router;
