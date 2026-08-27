import { Router } from "express";

import authController from "./auth.controller.js";

import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/authenticate.js";

import {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} from "./auth.validation.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Authentication Routes
|--------------------------------------------------------------------------
*/

// Register
router.post(
    "/register",
    validate(registerSchema),
    authController.register
);

// Login
router.post(
    "/login",
    validate(loginSchema),
    authController.login
);

// Refresh access token
router.post(
    "/refresh-token",
    authController.refreshToken
);

// Forgot password
router.post(
    "/forgot-password",
    validate(forgotPasswordSchema),
    authController.forgotPassword
);

// Reset password
router.post(
    "/reset-password",
    validate(resetPasswordSchema),
    authController.resetPassword
);

/*
|--------------------------------------------------------------------------
| Protected Authentication Routes
|--------------------------------------------------------------------------
*/

// Current logged-in user
router.get(
    "/me",
    authenticate,
    authController.me
);

// Logout
router.post(
    "/logout",
    authController.logout
);

export default router;