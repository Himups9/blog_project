import { useState, useEffect, useCallback } from "react";

import settingsService from "../services/settingsService";

const useBackupSettings = () => {

    const [backupSettings, setBackupSettings] = useState(null);

    const [backups, setBackups] = useState([]);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [creatingBackup, setCreatingBackup] = useState(false);

    const [restoringBackup, setRestoringBackup] = useState(false);

    const [deletingBackup, setDeletingBackup] = useState(false);

    const [error, setError] = useState(null);

    const clearError = () => {

        setError(null);

    };

    const getBackupSettings = useCallback(async () => {

        setLoading(true);

        clearError();

        try {

            const response = await settingsService.getBackupSettings();

            setBackupSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, []);

    const getBackupHistory = useCallback(async () => {

        try {

            const response = await settingsService.getBackupHistory();

            setBackups(response.data.results || response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        }

    }, []);

    const updateBackupSettings = async (data) => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.updateBackupSettings(data);

            setBackupSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const createBackup = async () => {

        setCreatingBackup(true);

        clearError();

        try {

            const response = await settingsService.createBackup();

            await getBackupHistory();

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setCreatingBackup(false);

        }

    };

    const restoreBackup = async (backupId) => {

        setRestoringBackup(true);

        clearError();

        try {

            const response = await settingsService.restoreBackup(backupId);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setRestoringBackup(false);

        }

    };

    const deleteBackup = async (backupId) => {

        setDeletingBackup(true);

        clearError();

        try {

            await settingsService.deleteBackup(backupId);

            setBackups((prev) =>
                prev.filter((backup) => backup.id !== backupId)
            );

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setDeletingBackup(false);

        }

    };

    const refresh = async () => {

        await Promise.all([
            getBackupSettings(),
            getBackupHistory(),
        ]);

    };

    useEffect(() => {

        refresh();

    }, [getBackupSettings, getBackupHistory]);

    return {

        // Data
        backupSettings,
        backups,

        // Status
        loading,
        saving,
        creatingBackup,
        restoringBackup,
        deletingBackup,
        error,

        // Actions
        getBackupSettings,
        getBackupHistory,
        updateBackupSettings,
        createBackup,
        restoreBackup,
        deleteBackup,
        refresh,
        clearError,

    };

};

export default useBackupSettings;