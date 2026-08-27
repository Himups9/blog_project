// frontend/src/features/dashboard/services/dashboardService.js

import api from "../../api";

/**
 * User Dashboard Service
 *
 * Handles API communication for the authenticated user's dashboard.
 *
 * GET /api/dashboard/user
 */

/**
 * Get User Dashboard data.
 *
 * @returns {Promise<Object>} User dashboard response
 */
const getUserDashboard = async () => {
    const response = await api.get("/dashboard/user");

    return response.data;
};

export {
    getUserDashboard,
};

export default {
    getUserDashboard,
};