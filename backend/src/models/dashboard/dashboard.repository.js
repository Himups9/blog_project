// backend/src/models/dashboard/dashboard.repository.js

import prisma from "../../config/prisma.js";

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
*/

/**
 * Get overall admin dashboard statistics.
 */
const getDashboardStats = async () => {
    const [
        totalUsers,
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalCategories,
        totalTags,
        totalComments,
        totalGalleryItems,
    ] = await Promise.all([
        prisma.user.count(),

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

        prisma.category.count(),

        prisma.tag.count(),

        prisma.comment.count(),

        prisma.gallery.count(),
    ]);

    return {
        totalUsers,
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalCategories,
        totalTags,
        totalComments,
        totalGalleryItems,
    };
};

/**
 * Get recent users.
 */
const getRecentUsers = async () => {
    return prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },

        take: 5,

        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
        },
    });
};

/**
 * Get recent blogs.
 */
const getRecentBlogs = async () => {
    return prisma.blog.findMany({
        orderBy: {
            createdAt: "desc",
        },

        take: 5,

        select: {
            id: true,
            title: true,
            slug: true,
            status: true,
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
                },
            },
        },
    });
};

/**
 * Get recent comments.
 */
const getRecentComments = async () => {
    return prisma.comment.findMany({
        orderBy: {
            createdAt: "desc",
        },

        take: 5,

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
        },
    });
};

/**
 * Get recent gallery items.
 */
const getRecentGallery = async () => {
    return prisma.gallery.findMany({
        orderBy: {
            createdAt: "desc",
        },

        take: 5,

        select: {
            id: true,
            title: true,
            imageUrl: true,
            thumbnailUrl: true,
            createdAt: true,
        },
    });
};


/*
|--------------------------------------------------------------------------
| USER DASHBOARD
|--------------------------------------------------------------------------
*/

/**
 * Get dashboard statistics for a specific user.
 */
const getUserDashboardStats = async (userId) => {
    const [
        totalBlogs,
        publishedBlogs,
        draftBlogs,
    ] = await Promise.all([
        prisma.blog.count({
            where: {
                authorId: userId,
            },
        }),

        prisma.blog.count({
            where: {
                authorId: userId,
                status: "PUBLISHED",
            },
        }),

        prisma.blog.count({
            where: {
                authorId: userId,
                status: "DRAFT",
            },
        }),
    ]);

    return {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
    };
};

/**
 * Get recent blogs created by a specific user.
 */
const getUserRecentBlogs = async (userId) => {
    return prisma.blog.findMany({
        where: {
            authorId: userId,
        },

        orderBy: {
            createdAt: "desc",
        },

        take: 5,

        select: {
            id: true,
            title: true,
            slug: true,
            status: true,
            featuredImage: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};


/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

export {
    // Admin Dashboard
    getDashboardStats,
    getRecentUsers,
    getRecentBlogs,
    getRecentComments,
    getRecentGallery,

    // User Dashboard
    getUserDashboardStats,
    getUserRecentBlogs,
};