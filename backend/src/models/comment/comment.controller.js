import commentService from "./comment.service.js";

import {
    STATUS_CODES,
    MESSAGES,
} from "../../constants/index.js";


class CommentController {

    /**
     * Create Comment
     */
    async create(req, res, next) {
        try {
            const comment = await commentService.create(
                req.validatedData || req.body,
                req.user.id
            );

            return res.status(
                STATUS_CODES.CREATED
            ).json({
                success: true,
                message: MESSAGES.COMMENT_CREATED,
                data: comment,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Get Comments for Blog
     */
    async getByBlog(req, res, next) {
        try {
            const { blogId } = req.params;

            const result = await commentService.getByBlog(
                blogId,
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
     * Get Comment by ID
     */
    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const comment = await commentService.getById(id, req.user);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                data: comment,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Update Own Comment
     */
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { content } = req.validatedData || req.body;

            const comment = await commentService.update(
                id,
                content,
                req.user
            );

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: MESSAGES.COMMENT_UPDATED,
                data: comment,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Delete Own Comment
     */
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const result = await commentService.delete(
                id,
                req.user
            );

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: MESSAGES.COMMENT_DELETED,
                ...result,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Get Comment Replies
     *
     * GET /api/comments/:id/replies
     */
    async getReplies(req, res, next) {
        try {
            const { id } = req.params;

            const replies = await commentService.getReplies(id);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                data: replies,
            });

        } catch (error) {
            next(error);
        }
    }

    /**
     * Admin: apply an existing moderation action to several comments.
     */
    async bulkModerate(req, res, next) {
        try {
            const { ids } = req.body;
            const { action } = req.params;

            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "ids must be a non-empty array.",
                });
            }

            const operations = {
                approve: (id) => commentService.approve(id, req.user),
                reject: (id) => commentService.reject(id, req.user),
                spam: (id) => commentService.markSpam(id),
                restore: (id) => commentService.restore(id),
                delete: (id) => commentService.deleteAdmin(id),
            };

            const operation = operations[action];

            if (!operation) {
                return res.status(404).json({
                    success: false,
                    message: "Unknown bulk action.",
                });
            }

            await Promise.all(ids.map(operation));

            return res.status(200).json({
                success: true,
                message: `Comments ${action}d successfully.`,
                data: { count: ids.length },
            });
        } catch (error) {
            next(error);
        }
    }


    /**
     * Delete Reply
     */
    async deleteReply(req, res, next) {
        try {
            const { replyId } = req.params;

            await commentService.deleteReply(replyId);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: "Reply deleted successfully.",
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Approve Comment
     */
    async approve(req, res, next) {
        try {
            const { id } = req.params;

            const comment = await commentService.approve(
                id,
                req.user
            );

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: MESSAGES.COMMENT_APPROVED,
                data: comment,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Reject Comment
     */
    async reject(req, res, next) {
        try {
            const { id } = req.params;

            const comment = await commentService.reject(
                id,
                req.user
            );

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: MESSAGES.COMMENT_REJECTED,
                data: comment,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Get All Comments
     */
    async getAll(req, res, next) {
        try {
            const result = await commentService.getAll(
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
     * Admin: Comment Statistics
     */
    async statistics(req, res, next) {
        try {
            const statistics =
                await commentService.statistics();

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                data: statistics,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Move Comment Back To Pending
     */
    async moveToPending(req, res, next) {
        try {
            const { id } = req.params;

            const comment =
                await commentService.moveToPending(id);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: "Comment moved back to pending.",
                data: comment,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Mark Comment As Spam
     */
    async markSpam(req, res, next) {
        try {
            const { id } = req.params;

            const comment =
                await commentService.markSpam(id);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: "Comment marked as spam.",
                data: comment,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Restore Comment
     */
    async restore(req, res, next) {
        try {
            const { id } = req.params;

            const comment =
                await commentService.restore(id);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: "Comment restored successfully.",
                data: comment,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Delete Comment
     */
    async deleteAdmin(req, res, next) {
        try {
            const { id } = req.params;

            await commentService.deleteAdmin(id);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: "Comment deleted successfully.",
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Reply To Comment
     */
    async reply(req, res, next) {
        try {
            const { id } = req.params;
            const { content } = req.body;

            const reply = await commentService.reply(
                id,
                req.user.id,
                content
            );

            return res.status(
                STATUS_CODES.CREATED
            ).json({
                success: true,
                message: "Reply created successfully.",
                data: reply,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Get Comment Reports
     */
    async getReports(req, res, next) {
        try {
            const { id } = req.params;

            const reports =
                await commentService.getReports(id);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                data: reports,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Bulk Approve
     */
    async bulkApprove(req, res, next) {
        try {
            const { ids } = req.body;

            const result =
                await commentService.bulkApprove(ids);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: "Comments approved successfully.",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Bulk Reject
     */
    async bulkReject(req, res, next) {
        try {
            const { ids } = req.body;

            const result =
                await commentService.bulkReject(ids);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: "Comments rejected successfully.",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Bulk Spam
     */
    async bulkSpam(req, res, next) {
        try {
            const { ids } = req.body;

            const result =
                await commentService.bulkSpam(ids);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: "Comments marked as spam successfully.",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Bulk Restore
     */
    async bulkRestore(req, res, next) {
        try {
            const { ids } = req.body;

            const result =
                await commentService.bulkRestore(ids);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: "Comments restored successfully.",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    }


    /**
     * Admin: Bulk Delete
     */
    async bulkDelete(req, res, next) {
        try {
            const { ids } = req.body;

            const result =
                await commentService.bulkDelete(ids);

            return res.status(
                STATUS_CODES.OK
            ).json({
                success: true,
                message: "Comments deleted successfully.",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    }

}


export default new CommentController();
