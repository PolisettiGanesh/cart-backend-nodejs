const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const router = express.Router();
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  async (req, res) => {
    try {
      const profile = req.user;

      let user = await User.findOne({
        $or: [
          { googleId: profile.id },
          { email: profile.emails[0].value },
        ],
      });

      if (user) {
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }
      } else {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });

        await user.save();
      }

      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
        },
        process.env.JWT_KEY,
        { expiresIn: "2h" }
      );

     const userData = await User.findById(user._id).select("-password");

res.json({
  message: "Google login successful",
  user: userData,
  token,
});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
