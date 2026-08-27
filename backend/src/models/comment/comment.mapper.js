class CommentMapper {

    /*
    |--------------------------------------------------------------------------
    | Basic Comment Response
    |--------------------------------------------------------------------------
    */

    toResponse(comment) {

        if (!comment) {
            return null;
        }

        return {
            id: comment.id,

            content: comment.content,

            status: comment.status,

            blogId: comment.blogId,

            userId: comment.userId,

            parentId: comment.parentId,

            createdAt: comment.createdAt,

            updatedAt: comment.updatedAt,

            user: comment.user
                ? {
                    id: comment.user.id,
                    firstName: comment.user.firstName,
                    lastName: comment.user.lastName,
                    email: comment.user.email,
                }
                : null,

            blog: comment.blog
                ? {
                    id: comment.blog.id,
                    title: comment.blog.title,
                    slug: comment.blog.slug,
                }
                : null,

            ...(Array.isArray(comment.replies) && {
                replies: comment.replies.map(
                    (reply) => this.toResponse(reply)
                ),
            }),
        };

    }


    /*
    |--------------------------------------------------------------------------
    | Comment Details
    |--------------------------------------------------------------------------
    */

    toDetailsResponse(comment) {

        if (!comment) {
            return null;
        }

        return {
            id: comment.id,

            content: comment.content,

            status: comment.status,

            blogId: comment.blogId,

            userId: comment.userId,

            parentId: comment.parentId,

            createdAt: comment.createdAt,

            updatedAt: comment.updatedAt,

            user: comment.user
                ? {
                    id: comment.user.id,
                    firstName: comment.user.firstName,
                    lastName: comment.user.lastName,
                    email: comment.user.email,
                }
                : null,

            blog: comment.blog
                ? {
                    id: comment.blog.id,
                    title: comment.blog.title,
                    slug: comment.blog.slug,
                }
                : null,

            parent: comment.parent
                ? {
                    id: comment.parent.id,
                    content: comment.parent.content,
                }
                : null,

            replies: Array.isArray(comment.replies)
                ? comment.replies.map(
                    (reply) => this.toResponse(reply)
                )
                : [],

        };

    }


    /*
    |--------------------------------------------------------------------------
    | Comment List
    |--------------------------------------------------------------------------
    */

    toList(comments = []) {

        return comments.map(
            (comment) =>
                this.toResponse(comment)
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Reply Response
    |--------------------------------------------------------------------------
    */

    toReplyResponse(reply) {

        if (!reply) {
            return null;
        }

        return {
            id: reply.id,

            content: reply.content,

            status: reply.status,

            blogId: reply.blogId,

            userId: reply.userId,

            parentId: reply.parentId,

            createdAt: reply.createdAt,

            updatedAt: reply.updatedAt,

            user: reply.user
                ? {
                    id: reply.user.id,
                    firstName: reply.user.firstName,
                    lastName: reply.user.lastName,
                }
                : null,
        };

    }


    /*
    |--------------------------------------------------------------------------
    | Replies List
    |--------------------------------------------------------------------------
    */

    toReplies(replies = []) {

        return replies.map(
            (reply) =>
                this.toReplyResponse(reply)
        );

    }

}


export default new CommentMapper();
