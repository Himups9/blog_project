// frontend/src/features/admin/hooks/useAdminDashboard.js

import { useCallback, useEffect, useState } from "react";
import adminDashboardService from "../services/adminDashboardService";

const useAdminDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response =
                await adminDashboardService.getAdminDashboard();

            if (response?.success) {
                setDashboard(response.data);
            } else {
                setError(
                    response?.message ||
                    "Failed to load admin dashboard data."
                );
            }
        } catch (error) {
            setError(
                error?.message ||
                "Failed to load admin dashboard data."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    return {
        dashboard,
        loading,
        error,
        refetch: fetchDashboard,
    };
};

export default useAdminDashboard;