import { useState, useEffect, useCallback } from "react";

import settingsService from "../services/settingsService";

const useSystemInformation = () => {

    const [systemInformation, setSystemInformation] = useState(null);

    const [serverStatus, setServerStatus] = useState(null);

    const [systemHealth, setSystemHealth] = useState(null);

    const [loading, setLoading] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    const [error, setError] = useState(null);

    const clearError = () => {

        setError(null);

    };

    const getSystemInformation = useCallback(async () => {

        setLoading(true);

        clearError();

        try {

            const response = await settingsService.getSystemInformation();

            setSystemInformation(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, []);

    const getServerStatus = useCallback(async () => {

        try {

            const response = await settingsService.getServerStatus();

            setServerStatus(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        }

    }, []);

    const getSystemHealth = useCallback(async () => {

        try {

            const response = await settingsService.getSystemHealth();

            setSystemHealth(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        }

    }, []);

    const refreshSystemInformation = async () => {

        setRefreshing(true);

        clearError();

        try {

            await Promise.all([
                getSystemInformation(),
                getServerStatus(),
                getSystemHealth(),
            ]);

        } finally {

            setRefreshing(false);

        }

    };

    useEffect(() => {

        refreshSystemInformation();

    }, [
        getSystemInformation,
        getServerStatus,
        getSystemHealth,
    ]);

    return {

        // Data
        systemInformation,
        serverStatus,
        systemHealth,

        // State
        loading,
        refreshing,
        error,

        // Actions
        getSystemInformation,
        getServerStatus,
        getSystemHealth,
        refreshSystemInformation,
        clearError,

    };

};

export default useSystemInformation;