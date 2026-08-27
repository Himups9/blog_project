import { useState, useEffect, useCallback } from "react";

import settingsService from "../services/settingsService";

const useContactSettings = () => {

    const [contactSettings, setContactSettings] = useState(null);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState(null);

    const clearError = () => {

        setError(null);

    };

    const getContactSettings = useCallback(async () => {

        setLoading(true);

        clearError();

        try {

            const response = await settingsService.getContactSettings();

            setContactSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, []);

    const updateContactSettings = async (data) => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.updateContactSettings(data);

            setContactSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const resetContactSettings = async () => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.resetContactSettings();

            setContactSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const refreshContactSettings = () => {

        getContactSettings();

    };

    useEffect(() => {

        getContactSettings();

    }, [getContactSettings]);

    return {

        // Data
        contactSettings,

        // Status
        loading,
        saving,
        error,

        // Actions
        getContactSettings,
        updateContactSettings,
        resetContactSettings,
        refreshContactSettings,
        clearError,

    };

};

export default useContactSettings;