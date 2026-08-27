import { useState, useEffect, useCallback } from "react";

import settingsService from "../services/settingsService";

const useMaintenance = () => {

    const [maintenanceSettings, setMaintenanceSettings] = useState(null);

    const [maintenanceStatus, setMaintenanceStatus] = useState(null);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [toggling, setToggling] = useState(false);

    const [scheduling, setScheduling] = useState(false);

    const [error, setError] = useState(null);

    const clearError = () => {

        setError(null);

    };

    const getMaintenanceSettings = useCallback(async () => {

        setLoading(true);

        clearError();

        try {

            const response = await settingsService.getMaintenanceSettings();

            setMaintenanceSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, []);

    const getMaintenanceStatus = useCallback(async () => {

        try {

            const response = await settingsService.getMaintenanceStatus();

            setMaintenanceStatus(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        }

    }, []);

    const updateMaintenanceSettings = async (data) => {

        setSaving(true);

        clearError();

        try {

            const response = await settingsService.updateMaintenanceSettings(data);

            setMaintenanceSettings(response.data);

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    const enableMaintenance = async () => {

        setToggling(true);

        clearError();

        try {

            const response = await settingsService.enableMaintenance();

            await getMaintenanceStatus();

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setToggling(false);

        }

    };

    const disableMaintenance = async () => {

        setToggling(true);

        clearError();

        try {

            const response = await settingsService.disableMaintenance();

            await getMaintenanceStatus();

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setToggling(false);

        }

    };

    const scheduleMaintenance = async (data) => {

        setScheduling(true);

        clearError();

        try {

            const response = await settingsService.scheduleMaintenance(data);

            await getMaintenanceSettings();

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setScheduling(false);

        }

    };

    const cancelMaintenanceSchedule = async () => {

        setScheduling(true);

        clearError();

        try {

            const response = await settingsService.cancelMaintenanceSchedule();

            await getMaintenanceSettings();

            return response.data;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setScheduling(false);

        }

    };

    const refresh = async () => {

        await Promise.all([
            getMaintenanceSettings(),
            getMaintenanceStatus(),
        ]);

    };

    useEffect(() => {

        refresh();

    }, [getMaintenanceSettings, getMaintenanceStatus]);

    return {

        // Data
        maintenanceSettings,
        maintenanceStatus,

        // State
        loading,
        saving,
        toggling,
        scheduling,
        error,

        // Actions
        getMaintenanceSettings,
        getMaintenanceStatus,
        updateMaintenanceSettings,

        enableMaintenance,
        disableMaintenance,

        scheduleMaintenance,
        cancelMaintenanceSchedule,

        refresh,
        clearError,

    };

};

export default useMaintenance;