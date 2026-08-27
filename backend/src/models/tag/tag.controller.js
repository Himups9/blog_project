import tagService from "./tag.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

import {
    STATUS_CODES,
    MESSAGES,
} from "../../constants/index.js";

class TagController {

    /**
     * Create Tag
     * POST /tags
     */
    create = asyncHandler(async (req, res) => {

        const tag = await tagService.create(
            req.validatedData,
            req.user.id
        );

        return res.status(STATUS_CODES.CREATED).json(

            new ApiResponse(
                STATUS_CODES.CREATED,
                MESSAGES.TAG_CREATED,
                tag
            )

        );

    });

    /**
     * Get All Tags
     * GET /tags
     */
    getAll = asyncHandler(async (req, res) => {

        const tags = await tagService.getAll(
            req.query
        );

        return res.status(STATUS_CODES.OK).json(

            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.SUCCESS,
                tags
            )

        );

    });

    /**
     * Get Tag By ID
     * GET /tags/:id
     */
    getById = asyncHandler(async (req, res) => {

        const tag = await tagService.getById(
            req.params.id
        );

        return res.status(STATUS_CODES.OK).json(

            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.SUCCESS,
                tag
            )

        );

    });

    /**
     * Get Tag By Slug
     * GET /tags/slug/:slug
     */
    getBySlug = asyncHandler(async (req, res) => {

        const tag = await tagService.getBySlug(
            req.params.slug
        );

        return res.status(STATUS_CODES.OK).json(

            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.SUCCESS,
                tag
            )

        );

    });

    /**
     * Update Tag
     * PATCH /tags/:id
     */
    update = asyncHandler(async (req, res) => {

        const tag = await tagService.update(

            req.params.id,

            req.validatedData,

            req.user.id

        );

        return res.status(STATUS_CODES.OK).json(

            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.TAG_UPDATED,
                tag
            )

        );

    });

    /**
     * Delete Tag
     * DELETE /tags/:id
     */
    delete = asyncHandler(async (req, res) => {

        await tagService.delete(
            req.params.id,
            req.user.id
        );

        return res.status(STATUS_CODES.OK).json(

            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.TAG_DELETED
            )

        );

    });

    /**
     * Tag Statistics
     * GET /tags/statistics
     */
    getStatistics = asyncHandler(async (req, res) => {

        const statistics =
            await tagService.getStatistics();

        return res.status(STATUS_CODES.OK).json(

            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.SUCCESS,
                statistics
            )

        );

    });

    /**
     * Blogs By Tag
     * GET /tags/:id/blogs
     */
    getTagBlogs = asyncHandler(async (req, res) => {

        const blogs =
            await tagService.getTagBlogs(
                req.params.id,
                req.query
            );

        return res.status(STATUS_CODES.OK).json(

            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.SUCCESS,
                blogs
            )

        );

    });

}

export default new TagController();
