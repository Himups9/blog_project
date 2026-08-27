import { Router } from "express";

import authController from "../controllers/auth.controller.js";

import validate from "../../../middleware/validate.middleware.js";

import authenticate from "../../../middleware/auth.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../../../validators";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

router.post(
  "/refresh-token",
  authController.refreshToken
);

router.post(
  "/logout",
  authController.logout
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/me",
  authenticate,
  authController.me
);

export default router;