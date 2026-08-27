import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import toast from "react-hot-toast";

import SettingSection from "../components/SettingSection";
import SecurityOptions from "../components/SecurityOptions";
import PasswordPolicy from "../components/PasswordPolicy";
import ConfirmResetModal from "../components/ConfirmResetModal";

import { useSettings } from "../hooks/useSettings";

const SecuritySettings = () => {

    const {

        securitySettings,

        loadingSecurity,

        fetchSecuritySettings,

        updateSecuritySettings,

        resetSecuritySettings,

    } = useSettings();

    const [showResetModal, setShowResetModal] = useState(false);

    useEffect(() => {

        fetchSecuritySettings();

    }, []);

    const handleSubmit = async (values) => {

        try {

            await updateSecuritySettings(values);

            toast.success("Security settings updated successfully.");

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Unable to update security settings."
            );

        }

    };

    const handleReset = async () => {

        try {

            await resetSecuritySettings();

            await fetchSecuritySettings();

            toast.success("Security settings restored.");

            setShowResetModal(false);

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Unable to reset security settings."
            );

        }

    };

    return (

        <div className="space-y-8">

            {/* Security Options */}

            <SettingSection

                title="Security Settings"

                description="Configure authentication, login protection and account security."

                icon={Shield}

                actions={

                    <button
                        type="button"
                        onClick={() => setShowResetModal(true)}
                        className="rounded-xl border border-red-300 px-5 py-2 text-red-600 transition hover:bg-red-50"
                    >

                        Reset Security

                    </button>

                }

            >

                <SecurityOptions

                    initialValues={securitySettings}

                    loading={loadingSecurity}

                    onSubmit={handleSubmit}

                />

            </SettingSection>

            {/* Password Policy */}

            <SettingSection

                title="Password Policy"

                description="Configure password strength and expiration rules."

                icon={Shield}

            >

                <PasswordPolicy

                    initialValues={securitySettings}

                    loading={loadingSecurity}

                    onSubmit={handleSubmit}

                />

            </SettingSection>

            {/* Reset Confirmation */}

            <ConfirmResetModal

                open={showResetModal}

                loading={loadingSecurity}

                title="Reset Security Settings"

                message="This will restore all security settings to their default values. This action cannot be undone."

                confirmText="Reset Security"

                variant="danger"

                onConfirm={handleReset}

                onClose={() => setShowResetModal(false)}

            />

        </div>

    );

};

export default SecuritySettings;