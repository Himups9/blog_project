// frontend/src/features/admin/services/adminDashboardService.js

import api from "../../api/axios";

/**
 * Admin Dashboard Service
 *
 * Backend:
 * GET /api/dashboard/admin
 */

const adminDashboardService = {

    async getAdminDashboard() {
        try {
            const response =
                await api.get("/dashboard/admin");

            return response.data;

        } catch (error) {

            throw (
                error?.response?.data ||
                error
            );
        }
    },

};

export default adminDashboardService;