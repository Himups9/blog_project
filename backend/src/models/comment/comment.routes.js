import { Router } from "express";

import commentController from "./comment.controller.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.middleware.js";
import {
    commentSchema,
    commentUpdateSchema,
} from "../../validators/comment.validator.js";

import { ROLES } from "../../constants/index.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

/**
 * Get approved comments for a blog
 *
 * GET /api/comments/blog/:blogId
 */
router.get(
    "/blog/:blogId",
    commentController.getByBlog
);


/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
*/

/**
 * Create Comment
 *
 * POST /api/comments
 */
router.post(
    "/",
    authenticate,
    validate(commentSchema),
    commentController.create
);


/**
 * Get Comment Replies
 *
 * GET /api/comments/:id/replies
 */
router.get(
    "/:id/replies",
    authenticate,
    commentController.getReplies
);


/**
 * Delete Reply
 *
 * DELETE /api/comments/replies/:replyId
 */
router.delete(
    "/replies/:replyId",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.deleteReply
);


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

/**
 * Get All Comments
 *
 * GET /api/comments/admin/all
 */
router.get(
    "/admin/all",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.getAll
);


/**
 * Comment Statistics
 *
 * GET /api/comments/admin/statistics
 */
router.get(
    "/admin/statistics",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.statistics
);

router.post(
    "/admin/bulk/:action",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.bulkModerate
);


/**
 * Approve Comment
 *
 * PATCH /api/comments/admin/:id/approve
 */
router.patch(
    "/admin/:id/approve",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.approve
);


/**
 * Reject Comment
 *
 * PATCH /api/comments/admin/:id/reject
 */
router.patch(
    "/admin/:id/reject",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.reject
);


/**
 * Move Comment Back To Pending
 *
 * PATCH /api/comments/admin/:id/pending
 */
router.patch(
    "/admin/:id/pending",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.moveToPending
);


/**
 * Mark Comment As Spam
 *
 * PATCH /api/comments/admin/:id/spam
 */
router.patch(
    "/admin/:id/spam",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.markSpam
);


/**
 * Restore Comment
 *
 * PATCH /api/comments/admin/:id/restore
 */
router.patch(
    "/admin/:id/restore",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.restore
);


/**
 * Delete Comment as Admin
 *
 * DELETE /api/comments/admin/:id
 */
router.delete(
    "/admin/:id",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.deleteAdmin
);


/**
 * Reply To Comment
 *
 * POST /api/comments/admin/:id/reply
 */
router.post(
    "/admin/:id/reply",
    authenticate,
    authorize(ROLES.ADMIN),
    commentController.reply
);


/*
|--------------------------------------------------------------------------
| Authenticated Comment Routes
|--------------------------------------------------------------------------
*/

/**
 * Get Comment by ID
 *
 * GET /api/comments/:id
 */
router.get(
    "/:id",
    authenticate,
    commentController.getById
);


/**
 * Update Own Comment
 *
 * PATCH /api/comments/:id
 */
router.patch(
    "/:id",
    authenticate,
    validate(commentUpdateSchema),
    commentController.update
);


/**
 * Delete Own Comment
 *
 * DELETE /api/comments/:id
 */
router.delete(
    "/:id",
    authenticate,
    commentController.delete
);


export default router;
