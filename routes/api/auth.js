const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");


const User = require("../../models/User");

// @route   GET api/auth
// @desc    Get authenticated users
// @access  Public
router.get("/", auth, async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Authentication failed." });
  }
});

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post("/",
  check("email", "Must be a valid email").isEmail(),
  check("password", "Must be at least 5 characters").exists(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid login credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid login credentials" }] });
      }

      // Create payload
      const payload = {
        user: {
          id: user.id
        }
      };
      // Return jsonwebtoken
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    };
  }
);

module.exports = router;