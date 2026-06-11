/**
 * Multer preparation for future document upload endpoints.
 * Actual storage will go through the configured storage adapter.
 */
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = {
  uploadSingleDocument: upload.single("document"),
};
