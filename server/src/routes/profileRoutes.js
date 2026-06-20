/**
 * Express route placeholder for profile.
 */
const authenticateSupabaseUser = require("../middleware/authenticateSupabaseUser");
const express = require("express");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const router = express.Router();

router.get("/", authenticateSupabaseUser, getProfile);
router.patch("/", authenticateSupabaseUser, updateProfile);

module.exports = router;
