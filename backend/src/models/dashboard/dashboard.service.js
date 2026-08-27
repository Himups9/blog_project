import {
    getDashboardStats,
    getRecentUsers,
    getRecentBlogs,
    getRecentComments,
    getRecentGallery,
    getUserDashboardStats,
    getUserRecentBlogs,
} from "./dashboard.repository.js";

const getAdminDashboard = async () => {
    const [
        stats,
        recentUsers,
        recentBlogs,
        recentComments,
        recentGallery,
    ] = await Promise.all([
        getDashboardStats(),
        getRecentUsers(),
        getRecentBlogs(),
        getRecentComments(),
        getRecentGallery(),
    ]);

    return {
        stats,
        recentUsers,
        recentBlogs,
        recentComments,
        recentGallery,
    };
};

const getUserDashboard = async (userId) => {
    const [
        stats,
        recentBlogs,
    ] = await Promise.all([
        getUserDashboardStats(userId),
        getUserRecentBlogs(userId),
    ]);

    return {
        stats,
        recentBlogs,
    };
};

export {
    getAdminDashboard,
    getUserDashboard,
};