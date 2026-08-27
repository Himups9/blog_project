import { useEffect, useState } from "react";
import settingsService from "../services/settingsService";

import useGeneralSettings  from "./useGeneralSettings";
import useSiteSettings  from "./useSiteSettings";
import useContactSettings from "./useContactSettings";
import useEmailSettings from "./useEmailSettings";
import useThemeSettings from "./useThemeSettings";
import useSecuritySettings from "./useSecuritySettings";
import useBackupSettings from "./useBackupSettings";
import useCacheSettings from "./useCacheSettings";
import useMaintenance from "./useMaintenance";
import useSystemInformation from "./useSystemInformation";
import useActivityLogs  from "./useActivityLogs";

export const useSettings = () => {

    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadSettings = async () => {

            try {

                const response = await settingsService.getSettings();

                setSettings(response.data);

            } catch (err) {

                setError(err);

            } finally {

                setLoading(false);

            }

        };

        loadSettings();

    }, []);

    return {

        settings,
        loading,
        error,

    };

};