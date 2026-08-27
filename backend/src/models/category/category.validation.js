import { body, param, query } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

export const createCategoryValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required.")
        .isLength({
            min: 2,
            max: 100,
        })
        .withMessage(
            "Category name must be between 2 and 100 characters."
        ),

    body("slug")
        .optional({
            checkFalsy: true,
        })
        .trim()
        .isLength({
            min: 2,
            max: 120,
        })
        .withMessage(
            "Slug must be between 2 and 120 characters."
        )
        .matches(/^[a-z0-9-]+$/)
        .withMessage(
            "Slug may only contain lowercase letters, numbers and hyphens."
        ),

    body("description")
        .optional({
            checkFalsy: true,
        })
        .trim()
        .isLength({
            max: 500,
        })
        .withMessage(
            "Description cannot exceed 500 characters."
        ),
];


/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

export const updateCategoryValidation = [

    param("id")
        .trim()
        .notEmpty()
        .withMessage(
            "Category ID is required."
        ),

    body("name")
        .optional({
            checkFalsy: true,
        })
        .trim()
        .isLength({
            min: 2,
            max: 100,
        })
        .withMessage(
            "Category name must be between 2 and 100 characters."
        ),

    body("slug")
        .optional({
            checkFalsy: true,
        })
        .trim()
        .isLength({
            min: 2,
            max: 120,
        })
        .withMessage(
            "Slug must be between 2 and 120 characters."
        )
        .matches(/^[a-z0-9-]+$/)
        .withMessage(
            "Slug may only contain lowercase letters, numbers and hyphens."
        ),

    body("description")
        .optional({
            checkFalsy: true,
        })
        .trim()
        .isLength({
            max: 500,
        })
        .withMessage(
            "Description cannot exceed 500 characters."
        ),
];


/*
|--------------------------------------------------------------------------
| Category ID
|--------------------------------------------------------------------------
*/

export const categoryIdValidation = [

    param("id")
        .trim()
        .notEmpty()
        .withMessage(
            "Category ID is required."
        ),
];


/*
|--------------------------------------------------------------------------
| Category Slug
|--------------------------------------------------------------------------
*/

export const categorySlugValidation = [

    param("slug")
        .trim()
        .notEmpty()
        .withMessage(
            "Category slug is required."
        )
        .matches(/^[a-z0-9-]+$/)
        .withMessage(
            "Invalid category slug."
        ),
];


/*
|--------------------------------------------------------------------------
| Category List
|--------------------------------------------------------------------------
*/

export const categoryListValidation = [

    query("page")
        .optional({
            checkFalsy: true,
        })
        .isInt({
            min: 1,
        })
        .withMessage(
            "Page must be greater than 0."
        ),

    query("limit")
        .optional({
            checkFalsy: true,
        })
        .isInt({
            min: 1,
            max: 100,
        })
        .withMessage(
            "Limit must be between 1 and 100."
        ),

    query("search")
        .optional({
            checkFalsy: true,
        })
        .trim()
        .isLength({
            max: 100,
        })
        .withMessage(
            "Search cannot exceed 100 characters."
        ),

    query("sortBy")
        .optional({
            checkFalsy: true,
        })
        .isIn([
            "name",
            "createdAt",
            "updatedAt",
        ])
        .withMessage(
            "Invalid sort field."
        ),

    query("sortOrder")
        .optional({
            checkFalsy: true,
        })
        .isIn([
            "asc",
            "desc",
        ])
        .withMessage(
            "Sort order must be asc or desc."
        ),
];