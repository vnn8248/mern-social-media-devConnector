const express = require("express");
const router = express.Router();

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Users route")
});

module.exports = router;