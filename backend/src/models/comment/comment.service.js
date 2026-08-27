import commentRepository from "./comment.repository.js";
import commentMapper from "./comment.mapper.js";
import blogRepository from "../blogs/blog.repository.js";

import ApiError from "../../utils/ApiError.js";

import {
    COMMENT_STATUS,
    ACTIVITY_ACTION,
    STATUS_CODES,
    MESSAGES,
    ROLES,
} from "../../constants/index.js";


class CommentService {

    /**
     * Create Comment
     */
    async create(data, userId) {

        // --------------------------------
        // 1. Check Blog
        // --------------------------------

        const blog =
            await blogRepository.findById(
                data.blogId
            );

        if (!blog) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.BLOG_NOT_FOUND
            );

        }


        // --------------------------------
        // 2. Check Parent Comment
        // --------------------------------

        if (data.parentId) {

            const parent =
                await commentRepository.findById(
                    data.parentId
                );

            if (!parent) {

                throw new ApiError(
                    STATUS_CODES.NOT_FOUND,
                    "Parent comment not found."
                );

            }


            // Parent must belong to
            // the same blog.

            if (
                parent.blogId !==
                data.blogId
            ) {

                throw new ApiError(
                    STATUS_CODES.BAD_REQUEST,
                    "Parent comment does not belong to this blog."
                );

            }

        }


        // --------------------------------
        // 3. Create Comment
        // --------------------------------

        const comment =
            await commentRepository.create({

                content:
                    data.content,

                blog: {
                    connect: {
                        id:
                            data.blogId,
                    },
                },

                user: {
                    connect: {
                        id:
                            userId,
                    },
                },

                ...(data.parentId && {
                    parent: {
                        connect: {
                            id:
                                data.parentId,
                        },
                    },
                }),

                status:
                    COMMENT_STATUS.PENDING,

            });


        // --------------------------------
        // 4. Activity Log
        // --------------------------------

        await commentRepository.createActivityLog({

            userId,

            action:
                ACTIVITY_ACTION.CREATE_COMMENT,

            entity:
                "Comment",

            entityId:
                comment.id,

        });


        return commentMapper.toResponse(comment);

    }


    /**
     * Get Comments for Blog
     */
    async getByBlog(blogId, query) {

        const {
            page = 1,
            limit = 10,
        } = query;


        // --------------------------------
        // Check Blog
        // --------------------------------

        const blog =
            await blogRepository.findById(
                blogId
            );

        if (!blog) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.BLOG_NOT_FOUND
            );

        }


        const pageNumber =
            Math.max(
                1,
                Number(page) || 1
            );

        const pageLimit =
            Math.min(
                50,
                Math.max(
                    1,
                    Number(limit) || 10
                )
            );


        const skip =
            (pageNumber - 1) *
            pageLimit;


        // --------------------------------
        // Public comments
        // --------------------------------

        const status =
            COMMENT_STATUS.APPROVED;


        const [
            comments,
            total,
        ] = await Promise.all([

            commentRepository.findByBlog(

                blogId,

                {
                    skip,

                    take:
                        pageLimit,

                    status,
                }

            ),

            commentRepository.countByBlog(

                blogId,

                status

            ),

        ]);


        return {

            data:
                commentMapper.toList(comments),

            pagination: {

                total,

                page:
                    pageNumber,

                limit:
                    pageLimit,

                totalPages:
                    Math.ceil(
                        total /
                        pageLimit
                    ),

            },

        };

    }


    /**
     * Get Comment by ID
     */
    async getById(id, user) {

        const comment =
            await commentRepository.findById(
                id
            );

        if (!comment) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.COMMENT_NOT_FOUND
            );

        }

        if (
            user.role !== ROLES.ADMIN &&
            comment.userId !== user.id
        ) {
            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                MESSAGES.FORBIDDEN
            );
        }

        return commentMapper.toDetailsResponse(comment);

    }


    /**
     * Update Comment
     */
    async update(id, content, user) {

        const comment =
            await commentRepository.findById(
                id
            );

        if (!comment) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.COMMENT_NOT_FOUND
            );

        }


        // --------------------------------
        // Authorization
        // --------------------------------

        if (
            user.role !== ROLES.ADMIN &&
            comment.user.id !== user.id
        ) {

            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                MESSAGES.FORBIDDEN
            );

        }


        // --------------------------------
        // Update
        // --------------------------------

        const updated =
            await commentRepository.update(
                id,
                {
                    content,
                }
            );


        // --------------------------------
        // Activity Log
        // --------------------------------

        await commentRepository.createActivityLog({

            userId:
                user.id,

            action:
                ACTIVITY_ACTION.UPDATE_COMMENT,

            entity:
                "Comment",

            entityId:
                id,

        });


        return commentMapper.toResponse(updated);

    }


    /**
     * Delete Comment
     */
    async delete(id, user) {

        const comment =
            await commentRepository.findById(
                id
            );

        if (!comment) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.COMMENT_NOT_FOUND
            );

        }


        // --------------------------------
        // Authorization
        // --------------------------------

        if (
            user.role !== ROLES.ADMIN &&
            comment.user.id !== user.id
        ) {

            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                MESSAGES.FORBIDDEN
            );

        }


        await commentRepository.delete(
            id
        );


        // --------------------------------
        // Activity Log
        // --------------------------------

        await commentRepository.createActivityLog({

            userId:
                user.id,

            action:
                ACTIVITY_ACTION.DELETE_COMMENT,

            entity:
                "Comment",

            entityId:
                id,

        });


        return {
            success: true,
        };

    }


    /**
     * Delete Reply
     */
    async deleteReply(replyId) {

        const reply =
            await commentRepository.findById(
                replyId
            );

        if (!reply) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.COMMENT_NOT_FOUND
            );

        }

        /*
        * Make sure this is actually a reply.
        */

        if (!reply.parentId) {

            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "This comment is not a reply."
            );

        }

        return commentRepository.deleteReply(
            replyId
        );

    }


    /**
     * Approve Comment
     */
    async approve(id, user) {

        const comment =
            await commentRepository.findById(
                id
            );

        if (!comment) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.COMMENT_NOT_FOUND
            );

        }


        // --------------------------------
        // Admin only
        // --------------------------------

        if (
            user.role !== ROLES.ADMIN
        ) {

            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                MESSAGES.FORBIDDEN
            );

        }


        const updated =
            await commentRepository.update(
                id,
                {
                    status:
                        COMMENT_STATUS.APPROVED,
                }
            );


        await commentRepository.createActivityLog({

            userId:
                user.id,

            action:
                ACTIVITY_ACTION.APPROVE_COMMENT,

            entity:
                "Comment",

            entityId:
                id,

        });


        return updated;

    }


    /**
     * Reject Comment
     */
    async reject(id, user) {

        const comment =
            await commentRepository.findById(
                id
            );

        if (!comment) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.COMMENT_NOT_FOUND
            );

        }


        // --------------------------------
        // Admin only
        // --------------------------------

        if (
            user.role !== ROLES.ADMIN
        ) {

            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                MESSAGES.FORBIDDEN
            );

        }


        const updated =
            await commentRepository.update(
                id,
                {
                    status:
                        COMMENT_STATUS.REJECTED,
                }
            );


        await commentRepository.createActivityLog({

            userId:
                user.id,

            action:
                ACTIVITY_ACTION.REJECT_COMMENT,

            entity:
                "Comment",

            entityId:
                id,

        });


        return updated;

    }


    /**
     * Admin Comment List
     */
    async getAll(query) {

        const {
            page = 1,
            limit = 10,
            search = "",
            status,
            blogId,
            userId,
        } = query;


        const pageNumber =
            Math.max(
                1,
                Number(page) || 1
            );


        const pageLimit =
            Math.min(
                50,
                Math.max(
                    1,
                    Number(limit) || 10
                )
            );


        const skip =
            (pageNumber - 1) *
            pageLimit;


        const [
            comments,
            total,
        ] = await Promise.all([

            commentRepository.findAll({

                skip,

                take:
                    pageLimit,

                search,

                status,

                blogId,

                userId,

            }),

            commentRepository.count({

                search,

                status,

                blogId,

                userId,

            }),

        ]);


        return {

            data:
                commentMapper.toList(comments),

            pagination: {

                total,

                page:
                    pageNumber,

                limit:
                    pageLimit,

                totalPages:
                    Math.ceil(
                        total /
                        pageLimit
                    ),

            },

        };

    }


    /**
     * Comment Statistics
     */
    async statistics() {

        return commentRepository.getStatistics();

    }


    async moveToPending(id) {
        const comment = await commentRepository.findById(id);

        if (!comment) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                "Comment not found."
            );
        }

        return commentRepository.update(id, {
            status: "PENDING",
        });
    }

    async markSpam(id) {
        const comment = await commentRepository.findById(id);

        if (!comment) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                "Comment not found."
            );
        }

        return commentRepository.update(id, {
            status: "SPAM",
        });
    }


    async restore(id) {
        const comment = await commentRepository.findById(id);

        if (!comment) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                "Comment not found."
            );
        }

        return commentRepository.update(id, {
            status: "APPROVED",
        });
    }

    async deleteAdmin(id) {
        const comment = await commentRepository.findById(id);

        if (!comment) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                "Comment not found."
            );
        }

        return commentRepository.delete(id);
    }

    async reply(parentId, userId, content) {
        const parentComment =
            await commentRepository.findById(parentId);

        if (!parentComment) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                "Parent comment not found."
            );
        }

        return commentRepository.create({
            blogId: parentComment.blogId,
            userId,
            parentId,
            content,
            status: "APPROVED",
        });
    }

    /**
     * Get Comment Replies
     */
    async getReplies(id) {
        const comment = await commentRepository.findById(id);

        if (!comment) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.COMMENT_NOT_FOUND
            );
        }

        return commentRepository.findReplies(id);
    }



}


export default new CommentService();
