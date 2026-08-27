import prisma from "../../config/prisma.js";

class CommentRepository {

    /**
     * Create Comment
     */
    async create(data) {

        return prisma.comment.create({
            data,

            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                    },
                },

                blog: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },

                parent: {
                    select: {
                        id: true,
                    },
                },
            },
        });

    }


    /**
     * Find Comment by ID
     */
    async findById(id) {

        return prisma.comment.findUnique({

            where: {
                id,
            },

            include: {

                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                    },
                },

                blog: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },

                parent: {
                    select: {
                        id: true,
                    },
                },

                replies: {

                    select: {
                        id: true,
                        content: true,
                        status: true,
                        createdAt: true,

                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                profileImage: true,
                            },
                        },
                    },

                    orderBy: {
                        createdAt: "asc",
                    },

                },

            },

        });

    }


    /**
     * Get Comments for Blog
     */
    async findByBlog(
        blogId,
        {
            skip = 0,
            take = 10,
            status,
        } = {}
    ) {

        return prisma.comment.findMany({

            where: {

                blogId,

                parentId: null,

                ...(status && {
                    status,
                }),

            },

            skip,
            take,

            orderBy: {
                createdAt: "desc",
            },

            include: {

                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                    },
                },

                replies: {

                    where: {

                        ...(status && {
                            status,
                        }),

                    },

                    orderBy: {
                        createdAt: "asc",
                    },

                    include: {

                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                profileImage: true,
                            },
                        },

                    },

                },

            },

        });

    }


    /**
     * Count Blog Comments
     */
    async countByBlog(
        blogId,
        status
    ) {

        return prisma.comment.count({

            where: {

                blogId,

                parentId: null,

                ...(status && {
                    status,
                }),

            },

        });

    }


    /**
     * Get All Comments
     * Admin
     */
    async findAll({
        skip = 0,
        take = 10,
        search = "",
        status,
        blogId,
        userId,
    }) {

        return prisma.comment.findMany({

            where: {

                // Only top-level comments
                parentId: null,

                ...(search && {
                    content: {
                        contains: search,
                        mode: "insensitive",
                    },
                }),

                ...(status && {
                    status,
                }),

                ...(blogId && {
                    blogId,
                }),

                ...(userId && {
                    userId,
                }),

            },

            skip,
            take,

            orderBy: {
                createdAt: "desc",
            },

            include: {

                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },

                blog: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },

                parent: {
                    select: {
                        id: true,
                    },
                },

            },

        });

    }


    /**
     * Count All Comments
     */
    async count({
        search = "",
        status,
        blogId,
        userId,
    }) {

        return prisma.comment.count({

            where: {

                // Must match findAll()
                parentId: null,

                ...(search && {
                    content: {
                        contains: search,
                        mode: "insensitive",
                    },
                }),

                ...(status && {
                    status,
                }),

                ...(blogId && {
                    blogId,
                }),

                ...(userId && {
                    userId,
                }),

            },

        });

    }


    /**
     * Update Comment
     */
    async update(id, data) {

        return prisma.comment.update({

            where: {
                id,
            },

            data,

            include: {

                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                    },
                },

                blog: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },

            },

        });

    }


    /**
     * Delete Comment
     */
    async delete(id) {

        return prisma.comment.delete({
            where: {
                id,
            },
        });

    }


    /**
     * Delete Reply
     */
    async deleteReply(replyId) {

        return prisma.comment.delete({
            where: {
                id: replyId,
            },
        });

    }


    /**
     * Get Comment Statistics
     */
    async getStatistics() {

        const [
            total,
            pending,
            approved,
            rejected,
        ] = await Promise.all([

            prisma.comment.count(),

            prisma.comment.count({
                where: {
                    status: "PENDING",
                },
            }),

            prisma.comment.count({
                where: {
                    status: "APPROVED",
                },
            }),

            prisma.comment.count({
                where: {
                    status: "REJECTED",
                },
            }),
            prisma.comment.count({
                where: {
                    status: "SPAM",
                },
            }),

        ]);

        return {
            total,
            pending,
            approved,
            rejected,
            spam,
        };

    }


    /**
     * Activity Log
     */
    async createActivityLog(data) {

        return prisma.activityLog.create({
            data,
        });

    }

    /**
     * Get Replies for Comment
     */
    async findReplies(commentId) {
        return prisma.comment.findMany({
            where: {
                parentId: commentId,
            },

            orderBy: {
                createdAt: "asc",
            },

            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                    },
                },
            },
        });
    }

    

}

export default new CommentRepository();
