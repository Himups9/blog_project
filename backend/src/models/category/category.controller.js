import categoryService from "./category.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

import { optimizeImage } from "../../utils/image.js";

import {
    STATUS_CODES,
    MESSAGES,
} from "../../constants/index.js";

class CategoryController {
    /*
    |--------------------------------------------------------------------------
    | Create Category
    |--------------------------------------------------------------------------
    | POST /api/categories/
    |--------------------------------------------------------------------------
    */

    create = asyncHandler(async (req, res) => {
        console.log(
            "========== CREATE CATEGORY =========="
        );

        console.log("BODY:", req.body);
        console.log(
            "VALIDATED DATA:",
            req.validatedData
        );
        console.log("FILES:", req.files);

        const data = {
            ...(req.validatedData || {}),
        };

        /*
        |--------------------------------------------------------------------------
        | Validate name
        |--------------------------------------------------------------------------
        */

        if (
            !data.name ||
            !String(data.name).trim()
        ) {
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json(
                    new ApiResponse(
                        STATUS_CODES.BAD_REQUEST,
                        "Category name is required.",
                        null
                    )
                );
        }

        /*
        |--------------------------------------------------------------------------
        | Normalize values
        |--------------------------------------------------------------------------
        */

        data.name = String(data.name).trim();

        if (data.slug) {
            data.slug = String(data.slug).trim();
        }

        if (data.description) {
            data.description =
                String(data.description).trim();
        }

        /*
        |--------------------------------------------------------------------------
        | Uploaded Files
        |--------------------------------------------------------------------------
        */

        const imageFile =
            req.files?.image?.[0] || null;

        const featuredImageFile =
            req.files?.featuredImage?.[0] || null;

        /*
        |--------------------------------------------------------------------------
        | Category Image
        |--------------------------------------------------------------------------
        */

        if (imageFile) {
            console.log(
                "Optimizing category image:",
                imageFile.path
            );

            const result = await optimizeImage(
                imageFile,
                "categories"
            );

            console.log(
                "Category image result:",
                result
            );

            data.image =
                `/uploads/${result.optimizedPath}`;
        }

        /*
        |--------------------------------------------------------------------------
        | Featured Image
        |--------------------------------------------------------------------------
        */

        if (featuredImageFile) {
            console.log(
                "Optimizing featured image:",
                featuredImageFile.path
            );

            const result = await optimizeImage(
                featuredImageFile,
                "categories/featured"
            );

            console.log(
                "Featured image result:",
                result
            );

            data.featuredImage =
                `/uploads/${result.optimizedPath}`;
        }

        /*
        |--------------------------------------------------------------------------
        | Create
        |--------------------------------------------------------------------------
        */

        const category =
            await categoryService.create(
                data,
                req.user.id
            );

        return res
            .status(STATUS_CODES.CREATED)
            .json(
                new ApiResponse(
                    STATUS_CODES.CREATED,
                    MESSAGES.CATEGORY_CREATED,
                    category
                )
            );
    });

    /*
    |--------------------------------------------------------------------------
    | Get All Categories
    |--------------------------------------------------------------------------
    | GET /api/categories/
    |--------------------------------------------------------------------------
    */

    getAll = asyncHandler(async (req, res) => {
        const categories =
            await categoryService.getAll(
                req.query
            );

        return res
            .status(STATUS_CODES.OK)
            .json(
                new ApiResponse(
                    STATUS_CODES.OK,
                    MESSAGES.SUCCESS,
                    categories
                )
            );
    });

    /*
    |--------------------------------------------------------------------------
    | Get Category By ID
    |--------------------------------------------------------------------------
    | GET /api/categories/:id
    |--------------------------------------------------------------------------
    */

    getById = asyncHandler(async (req, res) => {
        const category =
            await categoryService.getById(
                req.params.id
            );

        return res
            .status(STATUS_CODES.OK)
            .json(
                new ApiResponse(
                    STATUS_CODES.OK,
                    MESSAGES.SUCCESS,
                    category
                )
            );
    });

    /*
    |--------------------------------------------------------------------------
    | Get Category By Slug
    |--------------------------------------------------------------------------
    | GET /api/categories/slug/:slug
    |--------------------------------------------------------------------------
    */

    getBySlug = asyncHandler(async (req, res) => {
        const category =
            await categoryService.getBySlug(
                req.params.slug
            );

        return res
            .status(STATUS_CODES.OK)
            .json(
                new ApiResponse(
                    STATUS_CODES.OK,
                    MESSAGES.SUCCESS,
                    category
                )
            );
    });

    /*
    |--------------------------------------------------------------------------
    | Update Category
    |--------------------------------------------------------------------------
    | PATCH /api/categories/:id
    |--------------------------------------------------------------------------
    */

    update = asyncHandler(async (req, res) => {
        console.log(
            "========== UPDATE CATEGORY =========="
        );

        console.log(
            "ID:",
            req.params.id
        );

        console.log(
            "BODY:",
            req.body
        );

        console.log(
            "VALIDATED DATA:",
            req.validatedData
        );

        console.log(
            "FILES:",
            req.files
        );

        /*
        |--------------------------------------------------------------------------
        | Get validated data
        |--------------------------------------------------------------------------
        */

        const data = {
            ...(req.validatedData || {}),
        };

        /*
        |--------------------------------------------------------------------------
        | Normalize strings
        |--------------------------------------------------------------------------
        */

        if (data.name) {
            data.name = String(
                data.name
            ).trim();
        }

        if (data.slug) {
            data.slug = String(
                data.slug
            ).trim();
        }

        if (
            data.description !==
            undefined
        ) {
            data.description =
                String(
                    data.description || ""
                ).trim();
        }

        /*
        |--------------------------------------------------------------------------
        | Get Uploaded Files
        |--------------------------------------------------------------------------
        */

        const imageFile =
            req.files?.image?.[0] || null;

        const featuredImageFile =
            req.files?.featuredImage?.[0] ||
            null;

        /*
        |--------------------------------------------------------------------------
        | Optimize New Category Image
        |--------------------------------------------------------------------------
        */

        if (imageFile) {
            console.log(
                "Optimizing new category image:",
                imageFile.path
            );

            const result =
                await optimizeImage(
                    imageFile,
                    "categories"
                );

            data.image =
                `/uploads/${result.optimizedPath}`;
        }

        /*
        |--------------------------------------------------------------------------
        | Optimize New Featured Image
        |--------------------------------------------------------------------------
        */

        if (featuredImageFile) {
            console.log(
                "Optimizing new featured image:",
                featuredImageFile.path
            );

            const result =
                await optimizeImage(
                    featuredImageFile,
                    "categories/featured"
                );

            data.featuredImage =
                `/uploads/${result.optimizedPath}`;
        }

        /*
        |--------------------------------------------------------------------------
        | Update Category
        |--------------------------------------------------------------------------
        */

        const category =
            await categoryService.update(
                req.params.id,
                data,
                req.user.id
            );

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return res
            .status(STATUS_CODES.OK)
            .json(
                new ApiResponse(
                    STATUS_CODES.OK,
                    MESSAGES.CATEGORY_UPDATED,
                    category
                )
            );
    });

    /*
    |--------------------------------------------------------------------------
    | Delete Category
    |--------------------------------------------------------------------------
    | DELETE /api/categories/:id
    |--------------------------------------------------------------------------
    */

    delete = asyncHandler(async (req, res) => {
        await categoryService.delete(
            req.params.id,
            req.user.id
        );

        return res
            .status(STATUS_CODES.OK)
            .json(
                new ApiResponse(
                    STATUS_CODES.OK,
                    MESSAGES.CATEGORY_DELETED
                )
            );
    });

    /*
    |--------------------------------------------------------------------------
    | Category Statistics
    |--------------------------------------------------------------------------
    | GET /api/categories/statistics
    |--------------------------------------------------------------------------
    */

    getStatistics = asyncHandler(
        async (req, res) => {
            const statistics =
                await categoryService.getStatistics();

            return res
                .status(STATUS_CODES.OK)
                .json(
                    new ApiResponse(
                        STATUS_CODES.OK,
                        MESSAGES.SUCCESS,
                        statistics
                    )
                );
        }
    );

    /*
    |--------------------------------------------------------------------------
    | Category Blogs
    |--------------------------------------------------------------------------
    | GET /api/categories/:id/blogs
    |--------------------------------------------------------------------------
    */

    getCategoryBlogs = asyncHandler(
        async (req, res) => {
            const blogs =
                await categoryService.getCategoryBlogs(
                    req.params.id,
                    req.query
                );

            return res
                .status(STATUS_CODES.OK)
                .json(
                    new ApiResponse(
                        STATUS_CODES.OK,
                        MESSAGES.SUCCESS,
                        blogs
                    )
                );
        }
    );
}

export default new CategoryController();
