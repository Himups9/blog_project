import { useState, useEffect, useCallback } from "react";

import settingsService from "../services/settingsService";

const useCacheSettings = () => {

    const [cacheSettings, setCacheSettings] = useState(null);

    const [cacheStatus, setCacheStatus] = useState(null);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [clearingCache, setClearingCache] = useState(false);

    const [warmingCache, setWarmingCache] = useState(false);

    const [error, setError] = useState(null);

    const clearError = () => {

        setError(null);

    };

    const getCacheSettings = useCallback(async () => {

        setLoading(true);

        clearError();

        try {

            const response = await settingsService.getCacheSettings();

            setCacheSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, []);

    const getCacheStatus = useCallback(async () => {

        try {

            const response = await settingsService.getCacheStatus();

            setCacheStatus(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        }

    }, []);

    const updateCacheSettings = async (data) => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.updateCacheSettings(data);

            setCacheSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const clearCache = async () => {

        setClearingCache(true);

        clearError();

        try {

            const response = await settingsService.clearCache();

            await getCacheStatus();

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setClearingCache(false);

        }

    };

    const warmCache = async () => {

        setWarmingCache(true);

        clearError();

        try {

            const response = await settingsService.warmCache();

            await getCacheStatus();

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setWarmingCache(false);

        }

    };

    const refresh = async () => {

        await Promise.all([
            getCacheSettings(),
            getCacheStatus(),
        ]);

    };

    useEffect(() => {

        refresh();

    }, [getCacheSettings, getCacheStatus]);

    return {

        // Data
        cacheSettings,
        cacheStatus,

        // Status
        loading,
        saving,
        clearingCache,
        warmingCache,
        error,

        // Actions
        getCacheSettings,
        getCacheStatus,
        updateCacheSettings,
        clearCache,
        warmCache,
        refresh,
        clearError,

    };

};

export default useCacheSettings;