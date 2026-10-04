import { Router } from "express";
import multer from "multer";
import path from "path";

import categoryController from "./category.controller.js";

import {
    createCategoryValidation,
    updateCategoryValidation,
    categoryIdValidation,
    categorySlugValidation,
    categoryListValidation,
} from "./category.validation.js";

import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";

import { ROLES } from "../../constants/index.js";

import uploadRoot from "../../utils/uploadPath.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Upload Directory
|--------------------------------------------------------------------------
*/

const uploadDirectory = uploadRoot;

/*
|--------------------------------------------------------------------------
| Multer Storage
|--------------------------------------------------------------------------
*/

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (_req, file, cb) => {
        const extension = path.extname(
            file.originalname
        ).toLowerCase();

        const filename = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${extension}`;

        cb(null, filename);
    },
});

/*
|--------------------------------------------------------------------------
| Multer
|--------------------------------------------------------------------------
*/

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 2,
    },

    fileFilter: (_req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
            return;
        }

        cb(
            new Error(
                "Only JPG, PNG and WEBP images are allowed."
            )
        );
    },
});

/*
|--------------------------------------------------------------------------
| Upload Fields
|--------------------------------------------------------------------------
|
| Frontend sends:
|
| image
| featuredImage
|
*/

const categoryImageUpload = upload.fields([
    {
        name: "image",
        maxCount: 1,
    },
    {
        name: "featuredImage",
        maxCount: 1,
    },
]);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    categoryListValidation,
    validate,
    categoryController.getAll
);

router.get(
    "/statistics",
    categoryController.getStatistics
);

router.get(
    "/slug/:slug",
    categorySlugValidation,
    validate,
    categoryController.getBySlug
);

router.get(
    "/:id/blogs",
    categoryIdValidation,
    validate,
    categoryController.getCategoryBlogs
);

router.get(
    "/:id",
    categoryIdValidation,
    validate,
    categoryController.getById
);

/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authenticate,
    authorize(
        ROLES.ADMIN,
        ROLES.EDITOR
    ),

    categoryImageUpload,
    createCategoryValidation,
    validate,
    categoryController.create
);

/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id",
    authenticate,
    authorize(
        ROLES.ADMIN,
        ROLES.EDITOR
    ),

    categoryImageUpload,
    updateCategoryValidation,
    validate,
    categoryController.update
);

/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    authenticate,
    authorize(ROLES.ADMIN),

    categoryIdValidation,

    validate,

    categoryController.delete
);

export default router;