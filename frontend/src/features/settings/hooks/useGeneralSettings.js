// frontend/src/features/settings/hooks/useGeneralSettings.js

import {
    useState,
    useEffect,
    useCallback,
} from "react";

import settingsService from "../services/settingsService";

const useGeneralSettings = () => {
    const [settings, setSettings] = useState(null);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Clear Error
    |--------------------------------------------------------------------------
    */

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Get Settings
    |--------------------------------------------------------------------------
    */

    const getSettings = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response =
                await settingsService.getSettings();

            const result = response.data;

            if (result.success) {
                setSettings(result.data);
            }

            return result.data;
        } catch (err) {
            console.error(
                "Failed to fetch settings:",
                err.response?.data || err
            );

            setError(
                err.response?.data?.message ||
                    "Failed to fetch settings."
            );

            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Update Settings
    |--------------------------------------------------------------------------
    */

    const updateSettings = useCallback(
        async (data) => {
            setSaving(true);
            setError(null);

            try {
                const response =
                    await settingsService.updateSettings(
                        data
                    );

                const result = response.data;

                if (result.success) {
                    setSettings(result.data);
                }

                return result.data;
            } catch (err) {
                console.error(
                    "Failed to update settings:",
                    err.response?.data || err
                );

                setError(
                    err.response?.data?.message ||
                        "Failed to update settings."
                );

                throw err;
            } finally {
                setSaving(false);
            }
        },
        []
    );

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(async () => {
        return getSettings();
    }, [getSettings]);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        getSettings();
    }, [getSettings]);

    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */

    return {
        settings,
        loading,
        saving,
        error,

        getSettings,
        updateSettings,
        refresh,
        clearError,
    };
};

export default useGeneralSettings;