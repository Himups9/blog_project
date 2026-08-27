// frontend/src/features/settings/pages/GeneralSettings.jsx

import { useEffect } from "react";
import { Settings } from "lucide-react";
import toast from "react-hot-toast";

import GeneralSettingsForm from "../components/GeneralSettingsForm";
import SettingSection from "../components/SettingSection";

import useGeneralSettings from "../hooks/useGeneralSettings";

const GeneralSettings = () => {
    const {
        settings,
        loading,
        saving,
        getSettings,
        updateSettings,
    } = useGeneralSettings();

    /*
    |--------------------------------------------------------------------------
    | Load Settings
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        getSettings();
    }, [getSettings]);

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (values) => {
        try {
            /*
             * Settings supports:
             *
             * - normal text fields
             * - logo upload
             * - favicon upload
             *
             * Therefore we use FormData.
             */

            const formData = new FormData();

            const fieldMap = {
                site_name: "siteName",
                site_description: "siteDescription",
            };

            Object.entries(values).forEach(
                ([key, value]) => {
                    /*
                     * Don't send undefined values.
                     */
                    if (value === undefined) {
                        return;
                    }

                    /*
                     * Don't send null values.
                     */
                    if (value === null) {
                        return;
                    }

                    /*
                     * File upload.
                     */
                    if (value instanceof File) {
                        formData.append(key, value);
                        return;
                    }

                    /*
                     * Normal text values.
                     */
                    const backendKey = fieldMap[key];

                    if (!backendKey) {
                        return;
                    }

                    formData.set(
                        backendKey,
                        String(value)
                    );
                }
            );

            await updateSettings(formData);

            toast.success(
                "General settings updated successfully."
            );
        } catch (error) {
            console.error(
                "Update settings error:",
                error.response?.data || error
            );

            toast.error(
                error?.response?.data?.message ||
                    "Failed to update settings."
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading && !settings) {
        return (
            <div className="flex min-h-50 items-center justify-center">
                <p className="text-gray-500">
                    Loading settings...
                </p>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Page
    |--------------------------------------------------------------------------
    */

    return (
        <div className="space-y-8">
            <SettingSection
                title="General Settings"
                description="Configure your website's basic settings."
                icon={Settings}
            >
                <GeneralSettingsForm
                    initialValues={
                        settings
                            ? {
                                  site_name:
                                      settings.siteName || "",
                                  site_description:
                                      settings.siteDescription || "",
                              }
                            : null
                    }
                    loading={loading}
                    saving={saving}
                    onSubmit={handleSubmit}
                />
            </SettingSection>
        </div>
    );
};

export default GeneralSettings;
