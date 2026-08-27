import prisma from "../../config/prisma.js";

const tagSelect = {
    id: true,
    name: true,
    slug: true,
    description: true,
    createdAt: true,
    updatedAt: true,
};

class TagRepository {

    /**
     * Create Tag
     */
    async create(data) {
        return prisma.tag.create({
            data,
            select: tagSelect,
        });
    }

    /**
     * Find Tag By ID
     */
    async findById(id) {
        return prisma.tag.findUnique({
            where: { id },
            select: tagSelect,
        });
    }

    /**
     * Find Tag By Name
     */
    async findByName(name) {
        return prisma.tag.findUnique({
            where: { name },
            select: tagSelect,
        });
    }

    /**
     * Find Tag By Slug
     */
    async findBySlug(slug) {
        return prisma.tag.findUnique({
            where: { slug },
            select: tagSelect,
        });
    }

    /**
     * Get All Tags
     */
    async findAll({
        skip = 0,
        take = 10,
        search = "",
        sortBy = "createdAt",
        sortOrder = "desc",
    }) {

        const allowedSortFields = [
            "name",
            "createdAt",
            "updatedAt",
        ];

        const orderBy = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";

        const order = sortOrder === "asc"
            ? "asc"
            : "desc";

        return prisma.tag.findMany({
            where: {
                ...(search && {
                    OR: [
                        {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            slug: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ],
                }),
            },

            skip,
            take,

            orderBy: {
                [orderBy]: order,
            },

            select: tagSelect,
        });
    }

    /**
     * Count Tags
     */
    async count(search = "") {
        return prisma.tag.count({
            where: {
                ...(search && {
                    OR: [
                        {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            slug: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ],
                }),
            },
        });
    }

    /**
     * Update Tag
     */
    async update(id, data) {
        return prisma.tag.update({
            where: { id },
            data,
            select: tagSelect,
        });
    }

    /**
     * Delete Tag
     */
    async delete(id) {
        return prisma.tag.delete({
            where: { id },
        });
    }

    /**
     * Check Whether Tag Has Blogs
     */
    async hasBlogs(id) {

        const tag = await prisma.tag.findUnique({
            where: { id },

            select: {
                _count: {
                    select: {
                        blogs: true,
                    },
                },
            },
        });

        return (tag?._count.blogs ?? 0) > 0;
    }

    /**
     * Get Blogs By Tag
     */
    async getTagBlogs(
        id,
        {
            skip = 0,
            take = 10,
        }
    ) {

        const tag = await prisma.tag.findUnique({

            where: { id },

            select: {

                blogs: {

                    skip,
                    take,

                    orderBy: {
                        createdAt: "desc",
                    },

                    select: {

                        id: true,
                        title: true,
                        slug: true,
                        excerpt: true,
                        featuredImage: true,
                        status: true,
                        publishedAt: true,
                        createdAt: true,

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
                    },
                },
            },
        });

        return tag?.blogs ?? [];
    }

    /**
     * Tag Statistics
     */
    async getStatistics() {

        const [
            totalTags,
            tagsWithBlogs,
        ] = await Promise.all([
            prisma.tag.count(),
            prisma.tag.count({
                where: {
                    blogs: {
                        some: {},
                    },
                },
            }),
        ]);

        return {
            totalTags,
            tagsWithBlogs,
            emptyTags: totalTags - tagsWithBlogs,
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

export default new TagRepository();