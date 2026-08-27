import {
    getAdminDashboard,
    getUserDashboard,
} from "./dashboard.service.js";

const getAdminDashboardData = async (req, res, next) => {
    try {
        const dashboard = await getAdminDashboard();

        return res.status(200).json({
            success: true,
            message: "Admin dashboard data retrieved successfully.",
            data: dashboard,
        });
    } catch (error) {
        next(error);
    }
};

const getUserDashboardData = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const dashboard = await getUserDashboard(userId);

        return res.status(200).json({
            success: true,
            message: "User dashboard data retrieved successfully.",
            data: dashboard,
        });
    } catch (error) {
        next(error);
    }
};

export {
    getAdminDashboardData,
    getUserDashboardData,
};