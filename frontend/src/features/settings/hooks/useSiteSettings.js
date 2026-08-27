import { useState, useEffect, useCallback } from "react";

import settingsService from "../services/settingsService";

const useSiteSettings = () => {

    const [siteSettings, setSiteSettings] = useState(null);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState(null);

    const clearError = () => {

        setError(null);

    };

    const getSiteSettings = useCallback(async () => {

        setLoading(true);

        clearError();

        try {

            const response = await settingsService.getSiteSettings();

            setSiteSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, []);

    const updateSiteSettings = async (data) => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.updateSiteSettings(data);

            setSiteSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const refreshSiteSettings = () => {

        getSiteSettings();

    };

    useEffect(() => {

        getSiteSettings();

    }, [getSiteSettings]);

    return {

        // Data
        siteSettings,

        // State
        loading,
        saving,
        error,

        // Actions
        getSiteSettings,
        updateSiteSettings,
        refreshSiteSettings,
        clearError,

    };

};

export default useSiteSettings;