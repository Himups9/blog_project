import api from "../../services/api";

const dashboardService = {
    async getDashboardData() {
        const response = await api.get("/dashboard/");
        return response.data;
    },

    async getDashboardStats() {
        const response = await api.get("/dashboard/stats/");
        return response.data;
    },

    async getRecentBlogs(limit = 5) {
        const response = await api.get(
            `/dashboard/recent-blogs/?limit=${limit}`
        );

        return response.data;
    },

    async getRecentUsers(limit = 5) {
        const response = await api.get(
            `/dashboard/recent-users/?limit=${limit}`
        );

        return response.data;
    },
};

export default dashboardService;