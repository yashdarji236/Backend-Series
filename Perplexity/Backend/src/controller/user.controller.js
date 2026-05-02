import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Sendemail } from "../services/mail.services.js";

// ─── Async Error Wrapper ────────────────────────────────────────────────────
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ─── Register ───────────────────────────────────────────────────────────────
export const RegisterController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields (username, email, password) are required.",
      success: false,
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please provide a valid email address.",
      success: false,
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long.",
      success: false,
    });
  }

  const isUserExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExist) {
    return res.status(409).json({
      message: "A user with that email or username already exists.",
      success: false,
    });
  }

  // ✅ Plain password — model hook handles hashing
  const user = await userModel.create({
    username,
    email,
    password,
  });

  // ✅ Token with expiry
  const emailVerifyToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  // ✅ Dynamic base URL
  const BASE_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
  const verifyLink = `${BASE_URL}/api/auth/verify-email?token=${emailVerifyToken}`;

  // Run email sending in the background to prevent slow registration (fire-and-forget)
  Sendemail(
    email,
    "Verify your email – Perplexity",
    `Hi ${username}, please verify your email: ${verifyLink}`,
    `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2>Welcome to Perplexity, ${username}!</h2>
        <p>Thanks for signing up. Click the button below to verify your email address.</p>
        <a href="${verifyLink}"
           style="display:inline-block;padding:12px 24px;background:#4F46E5;color:#fff;border-radius:6px;text-decoration:none;">
          Verify Email
        </a>
        <p style="margin-top:24px;color:#666;font-size:13px;">
          This link expires in 24 hours. If you did not create an account, you can safely ignore this email.
        </p>
      </div>
    `
  ).catch(error => {
    console.error("Background email sending failed during registration:", error.message);
  });

  return res.status(201).json({
    message: "Registration successful! Please check your email to verify your account.",
    success: true,
  });
});

// ─── Login ───────────────────────────────────────────────────────────────────
export const LoginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
      success: false,
    });
  }

  // 2. Find user (include password for comparison)
  const user = await userModel.findOne({ email }).select("+password");

  // 3. Generic message to prevent user enumeration
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password.",
      success: false,
      errors: [{ field: "email", message: "No account found with this email." }],
    });
  }

  // 4. Compare password

  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password.",
      success: false,
      errors: [{ field: "password", message: "Incorrect password." }],
    });
  }

  // 5. Check email verification
  if (!user.verified) {
    return res.status(403).json({
      message: "Please verify your email before logging in.",
      success: false,
      errors: [{ field: "email", message: "Email not verified." }],
    });
  }

  // 6. Sign session token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 7. Set secure, httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({
    message: "Logged in successfully.",
    success: true,
    token: token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

// ─── Get Me ──────────────────────────────────────────────────────────────────
export const GetmeController = asyncHandler(async (req, res) => {
  // req.user.id is set by your auth middleware after verifying the cookie/token
  const user = await userModel.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
      success: false,
    });
  }

  return res.status(200).json({
    message: "User details fetched successfully.",
    success: true,   
    user,
  });
});

// ─── Verify Email ────────────────────────────────────────────────────────────
export const VerifyEmailController = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      message: "Verification token is missing.",
      success: false,
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // Distinguish expired vs. invalid for a clearer UX message
    const isExpired = err.name === "TokenExpiredError";
    return res.status(400).send(`
      <div style="font-family:sans-serif;text-align:center;padding:60px 20px;">
        <h2>⚠️ ${isExpired ? "Link Expired" : "Invalid Link"}</h2>
        <p>${
          isExpired
            ? "This verification link has expired. Please register again or request a new link."
            : "This verification link is invalid or has been tampered with."
        }</p>
        <a href="${process.env.CLIENT_URL}/register"
           style="display:inline-block;margin-top:20px;padding:10px 22px;background:#4F46E5;color:#fff;border-radius:6px;text-decoration:none;">
          Back to Register
        </a>
      </div>
    `);
  }

  const user = await userModel.findById(decoded.id);

  if (!user) {
    return res.status(400).json({
      message: "No account found for this token.",
      success: false,
    });
  }

  if (user.verified) {
    // Already verified — redirect gracefully
    return res.status(200).send(`
      <div style="font-family:sans-serif;text-align:center;padding:60px 20px;">
        <h2>✅ Already Verified</h2>
        <p>Your email is already verified. You can log in.</p>
        <a href="${process.env.CLIENT_URL}/login"
           style="display:inline-block;margin-top:20px;padding:10px 22px;background:#4F46E5;color:#fff;border-radius:6px;text-decoration:none;">
          Go to Login
        </a>
      </div>
    `);
  }

  // Mark as verified and save
  user.verified = true;
  await user.save();

  return res.status(200).send(`
    <div style="font-family:sans-serif;text-align:center;padding:60px 20px;">
      <h2>🎉 Email Verified!</h2>
      <p>Your email has been successfully verified. You can now log in.</p>
      <a href="${process.env.CLIENT_URL}/login"
         style="display:inline-block;margin-top:20px;padding:10px 22px;background:#4F46E5;color:#fff;border-radius:6px;text-decoration:none;">
        Go to Login
      </a>
    </div>
  `);
});

// ─── Logout ──────────────────────────────────────────────────────────────────
export const LogoutController = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "Logged out successfully.",
    success: true,
  });
});


export const resendEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required.",
            success: false
        });
    }

    const user = await userModel.findOne({ email });

    // Generic message to prevent email enumeration
    if (!user) {
        return res.status(200).json({
            message: "If that email exists, a verification link has been sent.",
            success: true
        });
    }

    if (user.verified) {
        return res.status(400).json({
            message: "This email is already verified. Please log in.",
            success: false
        });
    }

    // ✅ Correct: verification token, not session token
    const emailVerifyToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    try {
        await Sendemail(
            email,
            "Verify your email – Perplexity",
            `Hi ${user.username},\n\nHere is your new verification link.\n\nBest regards,\nThe Perplexity Team`,
            `
            <div style="font-family:sans-serif;max-width:600px;margin:auto;">
                <h2>Hi ${user.username},</h2>
                <p>Click the button below to verify your email address. This link expires in 24 hours.</p>
                <a href="${process.env.BASE_URL}/api/auth/verify-email?token=${emailVerifyToken}"
                   style="display:inline-block;padding:12px 24px;background:#4F46E5;color:#fff;border-radius:6px;text-decoration:none;">
                    Verify Email
                </a>
                <p style="margin-top:24px;color:#666;font-size:13px;">
                    If you did not request this, you can safely ignore this email.
                </p>
            </div>
            `
        );

        return res.status(200).json({
            message: "If that email exists, a verification link has been sent.",
            success: true
        });
    } catch (error) {
        console.error("Failed to resend email:", error);
        return res.status(500).json({
            message: "Failed to send verification email. Please check your email configuration.",
            success: false,
            error: error.message
        });
    }
});