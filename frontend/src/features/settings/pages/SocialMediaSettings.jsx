import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

import SettingSection from "../components/SettingSection";
import SocialMediaForm from "../components/SocialMediaForm";
import ConfirmResetModal from "../components/ConfirmResetModal";

import { useSettings } from "../hooks/useSettings";

const SocialMediaSettings = () => {

    const {

        socialMediaSettings,

        loadingSocialMedia,

        fetchSocialMediaSettings,

        updateSocialMediaSettings,

        resetSocialMediaSettings,

    } = useSettings();

    const [showResetModal, setShowResetModal] = useState(false);

    useEffect(() => {

        fetchSocialMediaSettings();

    }, []);

    const handleSubmit = async (values) => {

        try {

            await updateSocialMediaSettings(values);

            toast.success(
                "Social media settings updated successfully."
            );

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to update social media settings."

            );

        }

    };

    const handleReset = async () => {

        try {

            await resetSocialMediaSettings();

            await fetchSocialMediaSettings();

            toast.success(
                "Social media settings restored."
            );

            setShowResetModal(false);

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to reset social media settings."

            );

        }

    };

    return (

        <div className="space-y-8">

            <SettingSection

                title="Social Media Settings"

                description="Manage links to your social media platforms."

                icon={Share2}

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

                <SocialMediaForm

                    initialValues={socialMediaSettings}

                    loading={loadingSocialMedia}

                    onSubmit={handleSubmit}

                />

            </SettingSection>

            <ConfirmResetModal

                open={showResetModal}

                loading={loadingSocialMedia}

                title="Reset Social Media Settings"

                message="This will remove all configured social media links and restore the default values."

                confirmText="Reset"

                variant="warning"

                onConfirm={handleReset}

                onClose={() => setShowResetModal(false)}

            />

        </div>

    );

};

export default SocialMediaSettings;