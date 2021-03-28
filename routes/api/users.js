const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post("/",
  check("name", "Name is required").not().isEmpty(),
  check("email", "Must be a valid email").isEmail(),
  check("password", "Must be at least 5 characters").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // Create new user
      user = new User({
        name,
        email,
        password,
        avatar
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      res.send("User registered");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    };
  }
);

module.exports = router;