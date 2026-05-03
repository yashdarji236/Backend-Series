import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

// ─── Service: Handle Google User Auth ────────────────────────────────────────
export const handleGoogleUserAuth = async (profile) => {
  const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

  if (!email) {
    throw new Error("No email found from Google profile");
  }

  // Check if user already exists
  let user = await userModel.findOne({ email });

  if (user) {
    // Link googleId if missing
    if (!user.googleId) {
      user.googleId = profile.id;
      // Bypass validation for empty password if required
      await user.save();
    }
    return user;
  }

  // Generate a unique username based on the display name or email prefix
  const baseUsername = profile.displayName
    ? profile.displayName.replace(/\s+/g, "").toLowerCase()
    : email.split("@")[0];

  let username = baseUsername;
  let isUsernameTaken = await userModel.findOne({ username });

  while (isUsernameTaken) {
    username = `${baseUsername}${Math.floor(Math.random() * 10000)}`;
    isUsernameTaken = await userModel.findOne({ username });
  }

  // Create new user
  user = await userModel.create({
    username,
    email,
    googleId: profile.id,
    verified: true, // Auto-verify Google users
  });

  return user;
};

// ─── Service: Generate JWT Token ─────────────────────────────────────────────
export const generateAuthToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
