const express = require("express");
const router = express.Router();

// Temporary route to prevent crash
router.get("/", (req, res) => {
  res.send("Admin home page placeholder");
});

module.exports = router;
