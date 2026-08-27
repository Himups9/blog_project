import { useState, useEffect, useCallback } from "react";

import settingsService from "../services/settingsService";

const useSecuritySettings = () => {

    const [securitySettings, setSecuritySettings] = useState(null);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState(null);

    const clearError = () => {

        setError(null);

    };

    const getSecuritySettings = useCallback(async () => {

        setLoading(true);

        clearError();

        try {

            const response = await settingsService.getSecuritySettings();

            setSecuritySettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, []);

    const updateSecuritySettings = async (data) => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.updateSecuritySettings(data);

            setSecuritySettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const resetSecuritySettings = async () => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.resetSecuritySettings();

            setSecuritySettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const refreshSecuritySettings = () => {

        getSecuritySettings();

    };

    useEffect(() => {

        getSecuritySettings();

    }, [getSecuritySettings]);

    return {

        // Data
        securitySettings,

        // Status
        loading,
        saving,
        error,

        // Actions
        getSecuritySettings,
        updateSecuritySettings,
        resetSecuritySettings,
        refreshSecuritySettings,
        clearError,

    };

};

export default useSecuritySettings;
