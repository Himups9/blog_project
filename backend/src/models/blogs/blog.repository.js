import prisma from "../../config/prisma.js";
import { BLOG_STATUS } from "../../constants/index.js";
import { buildBlogWhere } from "./blog.filters.js";

const blogSelect = {
    id: true,
    title: true,
    slug: true,
    excerpt: true,
    content: true,

    featuredImage: true,

    seoTitle: true,
    seoDescription: true,

    status: true,
    isFeatured: true,

    readingTime: true,
    viewCount: true,

    publishedAt: true,

    createdAt: true,
    updatedAt: true,

    author: {
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
        },
    },

    category: {
        select: {
            id: true,
            name: true,
            slug: true,
        },
    },

    tags: {
        select: {
            id: true,
            name: true,
            slug: true,
        },
    },

    _count: {
        select: {
            comments: true,
        },
    },
};

class BlogRepository {

    /**
     * Create Blog
     */
    async create(data) {
        return prisma.blog.create({
            data,
            select: blogSelect,
        });
    }

    /**
     * Find By ID
     */
    async findById(id) {
        return prisma.blog.findUnique({
            where: { id },
            select: blogSelect,
        });
    }

    /**
     * Find By Slug
     */
    async findBySlug(slug) {
        return prisma.blog.findUnique({
            where: { slug },
            select: blogSelect,
        });
    }

    /**
     * Update Blog
     */
    async update(id, data) {
        return prisma.blog.update({
            where: { id },
            data,
            select: blogSelect,
        });
    }

    /**
     * Delete Blog
     */
    async delete(id) {
        return prisma.blog.delete({
            where: { id },
        });
    }

    /**
     * Publish Blog
     */
    async publish(id) {
        return prisma.blog.update({
            where: { id },
            data: {
                status: "PUBLISHED",
                publishedAt: new Date(),
            },
            select: blogSelect,
        });
    }

    /**
     * Archive Blog
     */
    async archive(id) {
        return prisma.blog.update({
            where: { id },
            data: {
                status: "ARCHIVED",
            },
            select: blogSelect,
        });
    }

    /**
     * Increase View Count
     */
    async incrementViews(id) {
        return prisma.blog.update({
            where: { id },
            data: {
                viewCount: {
                    increment: 1,
                },
            },
        });
    }

    /**
     * Admin Blog List
     */
    async findAll({
        skip = 0,
        take = 10,
        search = "",
        status,
        categoryId,
        authorId,
        tagId,
        isFeatured,
        sortBy = "createdAt",
        sortOrder = "desc",
    }) {

        const allowedSortFields = [
            "title",
            "createdAt",
            "updatedAt",
            "publishedAt",
            "viewCount",
        ];

        const orderBy = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";

        return prisma.blog.findMany({

            where: buildBlogWhere({
                search,
                status,
                categoryId,
                authorId,
                tagId,
                isFeatured,
            }),

            skip,

            take,

            orderBy: {
                [orderBy]: sortOrder,
            },

            select: blogSelect,
        });
    }

    /**
     * Public Blogs
     */
    async findPublished({
        skip = 0,
        take = 10,
        search = "",
        categoryId,
    }) {

        return prisma.blog.findMany({

            where: buildBlogWhere({
                status: BLOG_STATUS.PUBLISHED,
                search,
                categoryId,
            }),

            skip,

            take,

            orderBy: {
                publishedAt: "desc",
            },

            select: blogSelect,

        });

    }


    /**
     * Get Related Blogs
     *
     * Finds published blogs that share:
     * - the same category
     * - OR one or more of the same tags
     *
     * The current blog is excluded.
     */
    async findRelatedBlogs(
        blogId,
        categoryId,
        tagIds = [],
        limit = 5
    ) {

        return prisma.blog.findMany({

            where: {

                id: {
                    not: blogId,
                },

                status: BLOG_STATUS.PUBLISHED,

                OR: [

                    // Same category
                    ...(categoryId
                        ? [
                            {
                                categoryId,
                            },
                        ]
                        : []),

                    // Shared tags
                    ...(tagIds.length
                        ? [
                            {
                                tags: {
                                    some: {
                                        id: {
                                            in: tagIds,
                                        },
                                    },
                                },
                            },
                        ]
                        : []),

                ],

            },

            take: Number(limit),

            orderBy: [
                {
                    publishedAt: "desc",
                },
                {
                    createdAt: "desc",
                },
            ],

            include: {

                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },

                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },

                tags: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },

            },

        });

    }


    /**
     * Get Featured Blogs
     */
    async findFeaturedBlogs({
        skip = 0,
        take = 10,
    } = {}) {

        return prisma.blog.findMany({

            where: {

                status: BLOG_STATUS.PUBLISHED,

                isFeatured: true,

            },

            skip,

            take,

            orderBy: [
                {
                    publishedAt: "desc",
                },
                {
                    createdAt: "desc",
                },
            ],

            include: {

                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },

                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },

                tags: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },

            },

        });

    }



    /**
     * Count Blogs
     */
    async count(filters = {}) {

        return prisma.blog.count({

            where: buildBlogWhere(filters),

        });

    }

    /**
     * Count Featured Blogs
     */
    async countFeaturedBlogs() {

        return prisma.blog.count({

            where: {

                status:
                    BLOG_STATUS.PUBLISHED,

                isFeatured:
                    true,

            },

        });

    }


    /**
     * Statistics
     */
    async getStatistics() {

        const [
            totalBlogs,
            publishedBlogs,
            draftBlogs,
            archivedBlogs,
        ] = await Promise.all([

            prisma.blog.count(),

            prisma.blog.count({
                where: {
                    status: "PUBLISHED",
                },
            }),

            prisma.blog.count({
                where: {
                    status: "DRAFT",
                },
            }),

            prisma.blog.count({
                where: {
                    status: "ARCHIVED",
                },
            }),

        ]);

        return {
            totalBlogs,
            publishedBlogs,
            draftBlogs,
            archivedBlogs,
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

}

export default new BlogRepository();
