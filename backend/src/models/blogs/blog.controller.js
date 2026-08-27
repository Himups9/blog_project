import blogService from "./blog.service.js";

import asyncHandler from "../../middleware/asyncHandler.js";

import {
    STATUS_CODES,
    MESSAGES,
} from "../../constants/index.js";

class BlogController {

        /**
     * Create Blog
     */
    create = asyncHandler(async (req, res) => {

        const blog = await blogService.create(
            req.validatedData || req.body,
            req.file,
            req.user.id
        );

        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.BLOG_CREATED,
            data: blog,
        });

    });

     /**
     * Get All Blogs
     */
    getAll = asyncHandler(async (req, res) => {

        const blogs =
            await blogService.getAll(req.query);

        res.status(STATUS_CODES.OK).json({
            success: true,
            ...blogs,
        });

    });

        /**
     * Public Blogs
     */
    getPublished = asyncHandler(async (req, res) => {

        const blogs =
            await blogService.getPublished(req.query);

        res.status(STATUS_CODES.OK).json({
            success: true,
            ...blogs,
        });

    });

    /**
     * My Blogs
     */
    getMyBlogs = asyncHandler(async (req, res) => {

        const blogs =
            await blogService.getMyBlogs(
                req.user.id,
                req.query
            );

        res.status(STATUS_CODES.OK).json({
            success: true,
            ...blogs,
        });

    });

    /**
     * Upload multiple images for inline blog content.
     */
    uploadInlineImages = asyncHandler(async (req, res) => {
        const images = await blogService.uploadInlineImages(
            req.files || []
        );

        res.status(STATUS_CODES.OK).json({
            success: true,
            data: {
                images,
            },
        });
    });

    /**
     * Get Blog By ID
     */
    getById = asyncHandler(async (req, res) => {

        const blog =
            await blogService.getById(req.params.id);

        res.status(STATUS_CODES.OK).json({
            success: true,
            data: blog,
        });

    });

    /**
     * Get Blog By Slug
     */
    getBySlug = asyncHandler(async (req, res) => {

        const blog =
            await blogService.getBySlug(
                req.params.slug
            );

        res.status(STATUS_CODES.OK).json({
            success: true,
            data: blog,
        });

    });

    /**
     * Update Blog
     */
    update = asyncHandler(async (req, res) => {

        const blog =
            await blogService.update(
                req.params.id,
                req.validatedData || req.body,
                req.file,
                req.user
            );

        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.BLOG_UPDATED,
            data: blog,
        });

    });

    /**
     * Delete Blog
     */
    delete = asyncHandler(async (req, res) => {

        await blogService.delete(
            req.params.id,
            req.user
        );

        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.BLOG_DELETED,
        });

    });

    /**
     * Publish Blog
     */
    publish = asyncHandler(async (req, res) => {

        const blog =
            await blogService.publish(
                req.params.id,
                req.user
            );

        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.BLOG_PUBLISHED,
            data: blog,
        });

    });

  
    /**
     * Get Related Blogs
     */
    async getRelatedBlogs(req, res, next) {

        try {

            const {
                id,
            } = req.params;

            const {
                limit = 5,
            } = req.query;

            const blogs =
                await blogService.getRelatedBlogs(
                    id,
                    limit
                );

            return res.status(
                STATUS_CODES.OK
            ).json({

                success: true,

                data: blogs,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * Get Featured Blogs
     */
    async getFeaturedBlogs(req, res, next) {

        try {

            const result =
                await blogService.getFeaturedBlogs(
                    req.query
                );

            return res.status(
                STATUS_CODES.OK
            ).json({

                success: true,

                ...result,

            });

        } catch (error) {

            next(error);

        }

    }



    /**
     * Archive Blog
     */
    archive = asyncHandler(async (req, res) => {

        const blog =
            await blogService.archive(
                req.params.id,
                req.user
            );

        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.BLOG_ARCHIVED,
            data: blog,
        });

    });

    /**
     * Blog Statistics
     */
    statistics = asyncHandler(async (req, res) => {

        const statistics =
            await blogService.statistics();

        res.status(STATUS_CODES.OK).json({
            success: true,
            data: statistics,
        });

    });

    }

export default new BlogController();
