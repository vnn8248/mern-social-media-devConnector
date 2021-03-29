const express = require("express");
const router = express.Router();
const { check, validateResult, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   POST api/posts
// @desc    Create a post
// @access  Public
router.post("/", [
  auth,
  check("text", "Text is required").not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) res.status(500).json({ msg: "Server error" });

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    await newPost.save();

    res.json(newPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;