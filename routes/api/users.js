const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post("/",
  check("name", "Name is required").not().isEmpty(),
  check("email", "Must be a valid email").isEmail(),
  check("password", "Must be at least 5 characters").isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    res.send("User route");
  }
);

module.exports = router;