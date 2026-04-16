import { body, validationResult } from "express-validator";

// ─── Validate Middleware ───────────────────────────────────────────────────────

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// ─── Register Validator ───────────────────────────────────────────────────────

export const registerValidator = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required.")
    .isLength({ min: 3, max: 30 }).withMessage("Username must be 3-30 characters.")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username may only contain letters, numbers, and underscores."),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required.")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters.")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter.")
    .matches(/[0-9]/).withMessage("Password must contain at least one number.")
    .matches(/[^a-zA-Z0-9]/).withMessage("Password must contain at least one special character."),

  validate, // ← runs after all field checks, short-circuits if any failed
];