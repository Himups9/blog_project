import { Router } from "express";

import userController from "./user.controller.js";

import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import upload from "../../middleware/upload.js";

import {
    userIdSchema,
    userQuerySchema,
    updateProfileSchema,
    updateUserSchema,
} from "./user.validation.js";

import { ROLES } from "../../constants/index.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

/**
 * Get current logged-in user
 */
router.get(
    "/me",
    authenticate,
    userController.me
);

/**
 * Update current user's profile
 *
 * Supports:
 * - profileImage
 * - firstName
 * - lastName
 * - phone
 * - bio
 * - facebookUsername
 * - gender
 * - dateOfBirth
 * - position
 */
router.put(
    "/me",
    authenticate,
    upload.single("profileImage"),
    validate(updateProfileSchema),
    userController.updateProfile
);


/*
|--------------------------------------------------------------------------
| Admin - Users
|--------------------------------------------------------------------------
*/

/**
 * Get all users
 *
 * Supports:
 * - pagination
 * - search
 * - ordering
 */
router.get(
    "/",
    authenticate,
    authorize(ROLES.ADMIN),
    validate(userQuerySchema, "query"),
    userController.getUsers
);


/*
|--------------------------------------------------------------------------
| User Statistics
|--------------------------------------------------------------------------
*/

router.get(
    "/statistics",
    authenticate,
    authorize(ROLES.ADMIN),
    userController.statistics
);


/*
|--------------------------------------------------------------------------
| Get User By ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    authenticate,
    authorize(ROLES.ADMIN),
    validate(userIdSchema, "params"),
    userController.getUser
);


/*
|--------------------------------------------------------------------------
| Update User
|--------------------------------------------------------------------------
|
| Admin can update another user's profile.
|
| Supports profileImage upload.
|
*/

router.put(
    "/:id",
    authenticate,
    authorize(ROLES.ADMIN),
    validate(userIdSchema, "params"),
    upload.single("profileImage"),
    validate(updateUserSchema),
    userController.updateUser
);


/*
|--------------------------------------------------------------------------
| Activate User
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/activate",
    authenticate,
    authorize(ROLES.ADMIN),
    validate(userIdSchema, "params"),
    userController.activateUser
);


/*
|--------------------------------------------------------------------------
| Deactivate User
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/deactivate",
    authenticate,
    authorize(ROLES.ADMIN),
    validate(userIdSchema, "params"),
    userController.deactivateUser
);


/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    authenticate,
    authorize(ROLES.ADMIN),
    validate(userIdSchema, "params"),
    userController.deleteUser
);

export default router;