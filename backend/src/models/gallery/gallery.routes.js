import express from "express";

import {
    createGallery,
    getGallery,
    getGalleryById,
    updateGallery,
    deleteGallery,
} from "./gallery.controller.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

/**
 * Gallery routes
 */

/**
 * Get all gallery items.
 *
 * GET /api/gallery
 */
router.get(
    "/",
    getGallery
);

/**
 * Get a single gallery item.
 *
 * GET /api/gallery/:id
 */
router.get(
    "/:id",
    getGalleryById
);


router.post(
    "/",
    authenticate,
    authorize("ADMIN", "EDITOR"),
    upload.single("image"),
    createGallery
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "EDITOR"),
    upload.single("image"),
    updateGallery
);


router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deleteGallery
);

export default router;