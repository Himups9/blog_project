import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";
import toast from "react-hot-toast";

import SettingSection from "../components/SettingSection";
import ContactInformationForm from "../components/ContactForm";
import ConfirmResetModal from "../components/ConfirmResetModal";

import { useSettings } from "../hooks/useSettings";

const ContactSettings = () => {

    const {

        contactSettings,

        loadingContact,

        fetchContactSettings,

        updateContactSettings,

        resetContactSettings,

    } = useSettings();

    const [showResetModal, setShowResetModal] = useState(false);

    useEffect(() => {

        fetchContactSettings();

    }, [fetchContactSettings]);

    const handleSubmit = async (values) => {

        try {

            await updateContactSettings(values);

            toast.success(
                "Contact information updated successfully."
            );

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to update contact information."

            );

        }

    };

    const handleReset = async () => {

        try {

            await resetContactSettings();

            await fetchContactSettings();

            toast.success(
                "Contact information restored successfully."
            );

            setShowResetModal(false);

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to reset contact information."

            );

        }

    };

    return (

        <div className="space-y-8">

            <SettingSection

                title="Contact Settings"

                description="Manage your organization's contact information displayed throughout the website."

                icon={PhoneCall}

                actions={

                    <button
                        type="button"
                        onClick={() => setShowResetModal(true)}
                        className="rounded-xl border border-red-300 px-5 py-2 font-medium text-red-600 transition hover:bg-red-50"
                    >

                        Reset

                    </button>

                }

            >

                <ContactInformationForm

                    initialValues={contactSettings}

                    loading={loadingContact}

                    onSubmit={handleSubmit}

                />

            </SettingSection>

            <ConfirmResetModal

                open={showResetModal}

                loading={loadingContact}

                title="Reset Contact Settings"

                message="This will restore all contact information to the default values. This action cannot be undone."

                confirmText="Reset Contact"

                variant="warning"

                onConfirm={handleReset}

                onClose={() => setShowResetModal(false)}

            />

        </div>

    );

};

export default ContactSettings;