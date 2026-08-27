import { Router } from "express";

import tagController from "./tag.controller.js";

import {
    createTagValidation,
    updateTagValidation,
    tagIdValidation,
    tagSlugValidation,
    tagListValidation,
} from "./tag.validation.js";

import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";

import { ROLES } from "../../constants/index.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

/**
 * GET /tags
 */
router.get(
    "/",
    validate(tagListValidation, "query"),
    tagController.getAll
);

/**
 * GET /tags/statistics
 */
router.get(
    "/statistics",
    tagController.getStatistics
);

/**
 * GET /tags/slug/:slug
 */
router.get(
    "/slug/:slug",
    validate(tagSlugValidation, "params"),
    tagController.getBySlug
);

/**
 * GET /tags/:id
 */
router.get(
    "/:id",
    validate(tagIdValidation, "params"),
    tagController.getById
);

/**
 * GET /tags/:id/blogs
 */
router.get(
    "/:id/blogs",
    validate(tagIdValidation, "params"),
    tagController.getTagBlogs
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

/**
 * POST /tags
 */
router.post(
    "/",
    authenticate,
    authorize(
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    validate(createTagValidation),
    tagController.create
);

/**
 * PATCH /tags/:id
 */
router.patch(
    "/:id",
    authenticate,
    authorize(
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    validate(tagIdValidation, "params"),
    validate(updateTagValidation),
    tagController.update
);

/**
 * DELETE /tags/:id
 */
router.delete(
    "/:id",
    authenticate,
    authorize(
        ROLES.ADMIN
    ),
    validate(tagIdValidation, "params"),
    tagController.delete
);

export default router;