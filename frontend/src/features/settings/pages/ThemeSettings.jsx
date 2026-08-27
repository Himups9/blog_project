import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import toast from "react-hot-toast";

import ThemeCustomizer from "../components/ThemeCustomizer";
import SettingSection from "../components/SettingSection";
import ConfirmResetModal from "../components/ConfirmResetModal";

import { useSettings } from "../hooks/useSettings";

const ThemeSettings = () => {

    const {

        themeSettings,

        loadingTheme,

        fetchThemeSettings,

        updateThemeSettings,

        resetTheme,

    } = useSettings();

    const [showResetModal, setShowResetModal] = useState(false);

    useEffect(() => {

        fetchThemeSettings();

    }, []);

    const handleSubmit = async (values) => {

        try {

            await updateThemeSettings(values);

            toast.success("Theme updated successfully.");

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Unable to update theme."
            );

        }

    };

    const handleReset = async () => {

        try {

            await resetTheme();

            await fetchThemeSettings();

            toast.success("Theme restored to default.");

            setShowResetModal(false);

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Unable to reset theme."
            );

        }

    };

    return (

        <div className="space-y-8">

            <SettingSection

                title="Theme Settings"

                description="Customize your website's colors, appearance and branding."

                icon={Palette}

                actions={

                    <button
                        type="button"
                        onClick={() => setShowResetModal(true)}
                        className="rounded-xl border border-red-300 px-5 py-2 text-red-600 transition hover:bg-red-50"
                    >

                        Reset Theme

                    </button>

                }

            >

                <ThemeCustomizer

                    initialValues={themeSettings}

                    loading={loadingTheme}

                    onSubmit={handleSubmit}

                />

            </SettingSection>

            <ConfirmResetModal

                open={showResetModal}

                loading={loadingTheme}

                title="Reset Theme"

                message="This will restore the entire website theme to its default values. This action cannot be undone."

                confirmText="Reset Theme"

                variant="warning"

                onConfirm={handleReset}

                onClose={() => setShowResetModal(false)}

            />

        </div>

    );

};

export default ThemeSettings;