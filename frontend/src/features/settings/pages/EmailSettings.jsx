import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

import SettingSection from "../components/SettingSection";
import EmailSMTPForm from "../components/EmailSMTPForm";
import ConfirmResetModal from "../components/ConfirmResetModal";

import { useSettings } from "../hooks/useSettings";

const EmailSettings = () => {

    const {

        smtpSettings,

        loadingSMTP,

        fetchSMTPSettings,

        updateSMTPSettings,

        testSMTPConnection,

        resetSMTPSettings,

    } = useSettings();

    const [showResetModal, setShowResetModal] = useState(false);

    useEffect(() => {

        fetchSMTPSettings();

    }, []);

    const handleSubmit = async (values) => {

        try {

            await updateSMTPSettings(values);

            toast.success(
                "SMTP settings updated successfully."
            );

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to update SMTP settings."

            );

        }

    };

    const handleTestConnection = async () => {

        try {

            await testSMTPConnection();

            toast.success(
                "SMTP connection successful."
            );

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "SMTP connection failed."

            );

        }

    };

    const handleReset = async () => {

        try {

            await resetSMTPSettings();

            await fetchSMTPSettings();

            toast.success(
                "SMTP settings restored successfully."
            );

            setShowResetModal(false);

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to reset SMTP settings."

            );

        }

    };

    return (

        <div className="space-y-8">

            <SettingSection

                title="Email (SMTP) Settings"

                description="Configure the outgoing mail server used by the application."

                icon={Mail}

                actions={

                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={handleTestConnection}
                            disabled={loadingSMTP}
                            className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            Test SMTP

                        </button>

                        <button
                            type="button"
                            onClick={() => setShowResetModal(true)}
                            className="rounded-xl border border-red-300 px-5 py-2 font-medium text-red-600 transition hover:bg-red-50"
                        >

                            Reset

                        </button>

                    </div>

                }

            >

                <EmailSMTPForm

                    initialValues={smtpSettings}

                    loading={loadingSMTP}

                    onSubmit={handleSubmit}

                />

            </SettingSection>

            <ConfirmResetModal

                open={showResetModal}

                loading={loadingSMTP}

                title="Reset SMTP Settings"

                message="This will restore all SMTP configuration to the default values."

                confirmText="Reset SMTP"

                variant="warning"

                onConfirm={handleReset}

                onClose={() => setShowResetModal(false)}

            />

        </div>

    );

};

export default EmailSettings;