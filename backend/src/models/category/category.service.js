import slugify from "slugify";

import categoryRepository from "./category.repository.js";
import categoryMapper from "./category.mapper.js";

import ApiError from "../../utils/ApiError.js";

import {
    STATUS_CODES,
    MESSAGES,
} from "../../constants/index.js";


class CategoryService {

    /*
    |--------------------------------------------------------------------------
    | Create Category
    |--------------------------------------------------------------------------
    */

    async create(data = {}, userId) {
        const name =
            typeof data.name === "string"
                ? data.name.trim()
                : "";

        if (!name) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                MESSAGES.CATEGORY_NAME_REQUIRED ||
                "Category name is required."
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Duplicate Name
        |--------------------------------------------------------------------------
        */

        const existingName =
            await categoryRepository.findByName(name);

        if (existingName) {
            throw new ApiError(
                STATUS_CODES.CONFLICT,
                MESSAGES.CATEGORY_ALREADY_EXISTS
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Slug
        |--------------------------------------------------------------------------
        */

        const slugSource =
            typeof data.slug === "string" &&
            data.slug.trim()
                ? data.slug.trim()
                : name;

        const slug = slugify(slugSource, {
            lower: true,
            strict: true,
            trim: true,
        });

        if (!slug) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "A valid category slug could not be generated."
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Duplicate Slug
        |--------------------------------------------------------------------------
        */

        const existingSlug =
            await categoryRepository.findBySlug(slug);

        if (existingSlug) {
            throw new ApiError(
                STATUS_CODES.CONFLICT,
                MESSAGES.CATEGORY_SLUG_EXISTS
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Optional Fields
        |--------------------------------------------------------------------------
        */

        const description =
            typeof data.description === "string" &&
            data.description.trim()
                ? data.description.trim()
                : null;

        const image =
            typeof data.image === "string" &&
            data.image.trim()
                ? data.image.trim()
                : null;

        const featuredImage =
            typeof data.featuredImage === "string" &&
            data.featuredImage.trim()
                ? data.featuredImage.trim()
                : null;

        /*
        |--------------------------------------------------------------------------
        | Create
        |--------------------------------------------------------------------------
        */

        const category =
            await categoryRepository.create({
                name,
                slug,
                description,
                image,
                featuredImage,
            });

        return categoryMapper.toResponse(category);
    }


    /*
    |--------------------------------------------------------------------------
    | Get By ID
    |--------------------------------------------------------------------------
    */

    async getById(id) {
        const categoryId =
            typeof id === "string"
                ? id.trim()
                : "";

        if (!categoryId) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Category ID is required."
            );
        }

        const category =
            await categoryRepository.findById(
                categoryId
            );

        if (!category) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.CATEGORY_NOT_FOUND
            );
        }

        return categoryMapper.toResponse(category);
    }


    /*
    |--------------------------------------------------------------------------
    | Get By Slug
    |--------------------------------------------------------------------------
    */

    async getBySlug(slug) {
        const value =
            typeof slug === "string"
                ? slug.trim()
                : "";

        if (!value) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Category slug is required."
            );
        }

        const normalizedSlug =
            slugify(value, {
                lower: true,
                strict: true,
                trim: true,
            });

        if (!normalizedSlug) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Invalid category slug."
            );
        }

        const category =
            await categoryRepository.findBySlug(
                normalizedSlug
            );

        if (!category) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.CATEGORY_NOT_FOUND
            );
        }

        return categoryMapper.toResponse(category);
    }


    /*
    |--------------------------------------------------------------------------
    | Get All
    |--------------------------------------------------------------------------
    */

    async getAll(query = {}) {
        const page = Math.max(
            Number.parseInt(query.page, 10) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                Number.parseInt(query.limit, 10) || 10,
                1
            ),
            100
        );

        const skip = (page - 1) * limit;

        const search =
            typeof query.search === "string"
                ? query.search.trim()
                : "";

        const sortBy =
            typeof query.sortBy === "string"
                ? query.sortBy
                : "createdAt";

        const sortOrder =
            query.sortOrder === "asc"
                ? "asc"
                : "desc";

        const categories =
            await categoryRepository.findAll({
                skip,
                take: limit,
                search,
                sortBy,
                sortOrder,
            });

        const total =
            await categoryRepository.count(search);

        return {
            categories:
                categoryMapper.toResponseList(
                    categories
                ),

            pagination: {
                page,
                limit,
                total,
                totalPages:
                    Math.ceil(total / limit),
            },
        };
    }


    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

    async update(id, data = {}, userId) {
        const categoryId =
            typeof id === "string"
                ? id.trim()
                : "";

        if (!categoryId) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Category ID is required."
            );
        }

        const category =
            await categoryRepository.findById(
                categoryId
            );

        if (!category) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.CATEGORY_NOT_FOUND
            );
        }

        const updateData = {};

        /*
        |--------------------------------------------------------------------------
        | Name
        |--------------------------------------------------------------------------
        */

        if (data.name !== undefined) {
            const name =
                typeof data.name === "string"
                    ? data.name.trim()
                    : "";

            if (!name) {
                throw new ApiError(
                    STATUS_CODES.BAD_REQUEST,
                    "Category name cannot be empty."
                );
            }

            const existing =
                await categoryRepository.findByName(
                    name
                );

            if (
                existing &&
                existing.id !== categoryId
            ) {
                throw new ApiError(
                    STATUS_CODES.CONFLICT,
                    MESSAGES.CATEGORY_ALREADY_EXISTS
                );
            }

            updateData.name = name;
        }

        /*
        |--------------------------------------------------------------------------
        | Slug
        |--------------------------------------------------------------------------
        */

        if (
            data.slug !== undefined ||
            data.name !== undefined
        ) {
            const slugSource =
                typeof data.slug === "string" &&
                data.slug.trim()
                    ? data.slug.trim()
                    : updateData.name ||
                      category.name;

            const slug = slugify(slugSource, {
                lower: true,
                strict: true,
                trim: true,
            });

            if (!slug) {
                throw new ApiError(
                    STATUS_CODES.BAD_REQUEST,
                    "A valid category slug could not be generated."
                );
            }

            const existingSlug =
                await categoryRepository.findBySlug(
                    slug
                );

            if (
                existingSlug &&
                existingSlug.id !== categoryId
            ) {
                throw new ApiError(
                    STATUS_CODES.CONFLICT,
                    MESSAGES.CATEGORY_SLUG_EXISTS
                );
            }

            updateData.slug = slug;
        }

        /*
        |--------------------------------------------------------------------------
        | Description
        |--------------------------------------------------------------------------
        */

        if (data.description !== undefined) {
            updateData.description =
                typeof data.description === "string" &&
                data.description.trim()
                    ? data.description.trim()
                    : null;
        }

        /*
        |--------------------------------------------------------------------------
        | Category Image
        |--------------------------------------------------------------------------
        */

        if (data.image !== undefined) {
            updateData.image =
                typeof data.image === "string" &&
                data.image.trim()
                    ? data.image.trim()
                    : null;
        }

        /*
        |--------------------------------------------------------------------------
        | Featured Image
        |--------------------------------------------------------------------------
        */

        if (data.featuredImage !== undefined) {
            updateData.featuredImage =
                typeof data.featuredImage === "string" &&
                data.featuredImage.trim()
                    ? data.featuredImage.trim()
                    : null;
        }

        /*
        |--------------------------------------------------------------------------
        | Prevent Empty Update
        |--------------------------------------------------------------------------
        */

        if (Object.keys(updateData).length === 0) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "No category data was provided for update."
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Update
        |--------------------------------------------------------------------------
        */

        const updated =
            await categoryRepository.update(
                categoryId,
                updateData
            );

        return categoryMapper.toResponse(updated);
    }


    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    async delete(id, userId) {
        const categoryId =
            typeof id === "string"
                ? id.trim()
                : "";

        if (!categoryId) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Category ID is required."
            );
        }

        const category =
            await categoryRepository.findById(
                categoryId
            );

        if (!category) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.CATEGORY_NOT_FOUND
            );
        }

        const hasBlogs =
            await categoryRepository.hasBlogs(
                categoryId
            );

        if (hasBlogs) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                MESSAGES.CATEGORY_HAS_BLOGS
            );
        }

        await categoryRepository.delete(
            categoryId
        );

        return {
            success: true,
        };
    }


    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    async getStatistics() {
        const statistics =
            await categoryRepository.getStatistics();

        return categoryMapper.toStatistics(
            statistics
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Category Blogs
    |--------------------------------------------------------------------------
    */

    async getCategoryBlogs(id, query = {}) {
        const categoryId =
            typeof id === "string"
                ? id.trim()
                : "";

        if (!categoryId) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Category ID is required."
            );
        }

        const category =
            await categoryRepository.findById(
                categoryId
            );

        if (!category) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.CATEGORY_NOT_FOUND
            );
        }

        const page = Math.max(
            Number.parseInt(query.page, 10) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                Number.parseInt(query.limit, 10) || 10,
                1
            ),
            100
        );

        const blogs =
            await categoryRepository.getCategoryBlogs(
                categoryId,
                {
                    skip: (page - 1) * limit,
                    take: limit,
                }
            );

        return blogs;
    }
}


export default new CategoryService();