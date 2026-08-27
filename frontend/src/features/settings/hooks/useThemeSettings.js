import { useState, useEffect, useCallback } from "react";

import settingsService from "../services/settingsService";

const useThemeSettings = () => {

    const [themeSettings, setThemeSettings] = useState(null);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState(null);

    const clearError = () => {

        setError(null);

    };

    const getThemeSettings = useCallback(async () => {

        setLoading(true);

        clearError();

        try {

            const response = await settingsService.getThemeSettings();

            setThemeSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, []);

    const updateThemeSettings = async (data) => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.updateThemeSettings(data);

            setThemeSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const resetThemeSettings = async () => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.resetThemeSettings();

            setThemeSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const refreshThemeSettings = () => {

        getThemeSettings();

    };

    useEffect(() => {

        getThemeSettings();

    }, [getThemeSettings]);

    return {

        // Data
        themeSettings,

        // Status
        loading,
        saving,
        error,

        // Actions
        getThemeSettings,
        updateThemeSettings,
        resetThemeSettings,
        refreshThemeSettings,
        clearError,

    };

};

export default useThemeSettings;