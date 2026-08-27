import { useState, useEffect, useCallback } from "react";

import settingsService from "../services/settingsService";

const useActivityLogs = () => {

    const [logs, setLogs] = useState([]);

    const [selectedLog, setSelectedLog] = useState(null);

    const [loading, setLoading] = useState(false);

    const [exporting, setExporting] = useState(false);

    const [clearing, setClearing] = useState(false);

    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({

        search: "",

        action: "",

        user: "",

        start_date: "",

        end_date: "",

        ordering: "-created_at",

        page: 1,

        page_size: 20,

    });

    const [pagination, setPagination] = useState({

        count: 0,

        next: null,

        previous: null,

    });

    const clearError = () => {

        setError(null);

    };

    const getActivityLogs = useCallback(async (params = {}) => {

        setLoading(true);

        clearError();

        try {

            const requestParams = {

                ...filters,

                ...params,

            };

            const response = await settingsService.getActivityLogs(requestParams);

            const data = response.data;

            setLogs(data.results || []);

            setPagination({

                count: data.count || 0,

                next: data.next || null,

                previous: data.previous || null,

            });

            return data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, [filters]);

    const getActivityLog = async (id) => {

        clearError();

        try {

            const response = await settingsService.getActivityLog(id);

            setSelectedLog(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        }

    };

    const exportActivityLogs = async (params = {}) => {

        setExporting(true);

        clearError();

        try {

            const response = await settingsService.exportActivityLogs(params);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setExporting(false);

        }

    };

    const clearActivityLogs = async () => {

        setClearing(true);

        clearError();

        try {

            const response = await settingsService.clearActivityLogs();

            setLogs([]);

            setPagination({

                count: 0,

                next: null,

                previous: null,

            });

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setClearing(false);

        }

    };

    const updateFilters = (newFilters) => {

        setFilters((prev) => ({

            ...prev,

            ...newFilters,

        }));

    };

    const refresh = () => {

        getActivityLogs();

    };

    useEffect(() => {

        getActivityLogs();

    }, [getActivityLogs]);

    return {

        // Data
        logs,
        selectedLog,
        pagination,
        filters,

        // State
        loading,
        exporting,
        clearing,
        error,

        // Actions
        getActivityLogs,
        getActivityLog,
        exportActivityLogs,
        clearActivityLogs,
        updateFilters,
        refresh,
        clearError,

    };

};

export default useActivityLogs;