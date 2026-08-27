import { Router } from "express";

import blogController from "./blog.controller.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.middleware.js";
import upload from "../../middleware/upload.js";



import {
    createBlogSchema,
    updateBlogSchema,
} from "./blog.validation.js";

import {
    ROLES,
} from "../../constants/index.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Published Blogs
router.get(
    "/",
    blogController.getPublished
);

// Blog Statistics
router.get(
    "/statistics",
    blogController.statistics
);


// Get Featured
router.get(
    "/featured",
    blogController.getFeaturedBlogs
);

// Blog Details
router.get(
    "/id/:id",
    blogController.getById
);

// Blog By Slug
router.get(
    "/slug/:slug",
    blogController.getBySlug
);

// Related Blogs
router.get(
    "/:id/related",
    blogController.getRelatedBlogs
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.use(authenticate);

// Logged-in User Blogs
router.get(
    "/my",
    blogController.getMyBlogs
);

// Inline article images
router.post(
    "/inline-images",
    authorize(
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.AUTHOR
    ),
    upload.array("images", 20),
    blogController.uploadInlineImages
);

// Create Blog
router.post(
    "/",
    authorize(
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.AUTHOR
    ),
    upload.single("featuredImage"),
    validate(createBlogSchema),
    blogController.create
);

// Update Blog
router.put(
    "/:id",
    authorize(
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.AUTHOR
    ),
    upload.single("featuredImage"),
    validate(updateBlogSchema),
    blogController.update
);

// Delete Blog
router.delete(
    "/:id",
    authorize(
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.AUTHOR
    ),
    blogController.delete
);

// Publish Blog
router.patch(
    "/:id/publish",
    authorize(
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    blogController.publish
);

// Archive Blog
router.patch(
    "/:id/archive",
    authorize(
        ROLES.ADMIN,
        ROLES.EDITOR
    ),
    blogController.archive
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
    "/admin/all",
    authorize(
        ROLES.ADMIN
    ),
    blogController.getAll
);

export default router;
