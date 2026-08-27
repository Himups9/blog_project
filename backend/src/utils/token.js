import jwt from "jsonwebtoken";
import crypto from "crypto";
import { jwtConfig } from "../config/jwt.js";

/**
 * Generate Access Token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(
    {
      ...payload,
      type: "access",
      jti: crypto.randomUUID(),
    },
    jwtConfig.secret,
    {
      expiresIn: jwtConfig.expiresIn,
    }
  );
};

/**
 * Generate Refresh Token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(
    {
      ...payload,
      type: "refresh",
      jti: crypto.randomUUID(),
    },
    jwtConfig.refreshSecret,
    {
      expiresIn: jwtConfig.refreshExpiresIn,
    }
  );
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch {
    return null;
  }
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.refreshSecret);
  } catch {
    return null;
  }
};