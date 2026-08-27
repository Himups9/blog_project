import crypto from "crypto";

/**
 * Generate a secure random password reset token.
 *
 * Returns:
 * {
 *   token: plain token (send via email)
 *   hashedToken: hashed token (store in database)
 * }
 */
export const generatePasswordResetToken = () => {
  const token = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return {
    token,
    hashedToken,
  };
};

/**
 * Hash a password reset token received from the user.
 * Used when validating the reset token.
 */
export const hashPasswordResetToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

/**
 * Returns the expiration date for a password reset token.
 * Default: 1 hour.
 */
export const getPasswordResetTokenExpiry = () => {
  return new Date(Date.now() + 60 * 60 * 1000);
};