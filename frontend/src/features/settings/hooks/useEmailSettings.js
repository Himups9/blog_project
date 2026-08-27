import { useState, useEffect, useCallback } from "react";

import settingsService from "../services/settingsService";

const useEmailSettings = () => {

    const [emailSettings, setEmailSettings] = useState(null);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [testing, setTesting] = useState(false);

    const [error, setError] = useState(null);

    const clearError = () => {

        setError(null);

    };

    const getEmailSettings = useCallback(async () => {

        setLoading(true);

        clearError();

        try {

            const response = await settingsService.getEmailSettings();

            setEmailSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, []);

    const updateEmailSettings = async (data) => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.updateEmailSettings(data);

            setEmailSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const testEmailConnection = async (data = {}) => {

        setTesting(true);

        clearError();

        try {

            const response = await settingsService.testEmailConnection(data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setTesting(false);

        }

    };

    const resetEmailSettings = async () => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.resetEmailSettings();

            setEmailSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const refreshEmailSettings = () => {

        getEmailSettings();

    };

    useEffect(() => {

        getEmailSettings();

    }, [getEmailSettings]);

    return {

        // Data
        emailSettings,

        // Status
        loading,
        saving,
        testing,
        error,

        // Actions
        getEmailSettings,
        updateEmailSettings,
        testEmailConnection,
        resetEmailSettings,
        refreshEmailSettings,
        clearError,

    };

};

export default useEmailSettings;