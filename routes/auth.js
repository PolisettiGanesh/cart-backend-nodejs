const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");

const router = express.Router();

/* ========================================
   🔹 TOKEN GENERATOR (ACCESS + REFRESH)
======================================== */

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
    },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "5m" }
  );

  const refreshToken = jwt.sign(
    {
      _id: user._id,
    },
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

/* ========================================
   🔹 REUSABLE OAUTH HANDLER FUNCTION
======================================== */

const handleOAuthCallback = async (profile, providerField) => {
  let user = await User.findOne({
    $or: [
      { [providerField]: profile.id },
      { email: profile.emails?.[0]?.value },
    ],
  });

  if (user) {
    if (!user[providerField]) {
      user[providerField] = profile.id;
      await user.save();
    }
  } else {
    user = new User({
      name: profile.displayName,
      email: profile.emails?.[0]?.value,
      [providerField]: profile.id,
    });

    await user.save();
  }

  // 🔹 Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // 🔹 Hash refresh token
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  user.refreshToken = hashedRefreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

/* ========================================
        GOOGLE AUTH ROUTES
======================================== */

// Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const profile = req.user;

      const { user, accessToken, refreshToken } =
        await handleOAuthCallback(profile, "googleId");

      // Set refresh token cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const userData = await User.findById(user._id).select("-password");

      res.json({
        message: "Google login successful",
        user: userData,
        accessToken,
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* ========================================
        FACEBOOK AUTH ROUTES
======================================== */

// Redirect to Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

// Facebook Callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  async (req, res) => {
    try {
      const profile = req.user;

      const { user, accessToken, refreshToken } =
        await handleOAuthCallback(profile, "facebookId");

      // Set refresh token cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const userData = await User.findById(user._id).select("-password");

      res.json({
        message: "Facebook login successful",
        user: userData,
        accessToken,
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* ========================================
            🔄 REFRESH API
======================================== */

router.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY
    );

    const user = await User.findById(decoded._id);

    if (!user || !user.refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const isMatch = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );

    if (!isMatch) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // 🔹 Rotate tokens
    const { accessToken, refreshToken: newRefreshToken } =
      generateTokens(user);

    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    user.refreshToken = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });

  } catch (error) {
    res.status(403).json({ message: "Refresh failed" });
  }
});

/* ========================================
            🚪 LOGOUT API
======================================== */

router.post("/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );

      const user = await User.findById(decoded._id);

      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


