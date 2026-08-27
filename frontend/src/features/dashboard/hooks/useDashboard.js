// frontend/src/features/dashboard/hooks/useDashboard.js

import { useCallback, useEffect, useState } from "react";
import { getUserDashboard } from "../services/dashboardService";

const useDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getUserDashboard();

            if (response?.success) {
                setDashboard(response.data);
            } else {
                setError(
                    response?.message ||
                    "Failed to load dashboard data."
                );
            }
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to load dashboard data."
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

export default useDashboard;