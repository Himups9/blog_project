import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import toast from "react-hot-toast";

import SettingSection from "../components/SettingSection";
import SiteInformationForm from "../components/SiteInformationForm";
import ConfirmResetModal from "../components/ConfirmResetModal";

import { useSettings } from "../hooks/useSettings";

const SiteSettings = () => {

    const {

        siteInformation,

        loadingSiteInformation,

        fetchSiteInformation,

        updateSiteInformation,

        resetSiteInformation,

    } = useSettings();

    const [showResetModal, setShowResetModal] = useState(false);

    useEffect(() => {

        fetchSiteInformation();

    }, []);

    const handleSubmit = async (values) => {

        try {

            await updateSiteInformation(values);

            toast.success(
                "Site information updated successfully."
            );

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to update site information."

            );

        }

    };

    const handleReset = async () => {

        try {

            await resetSiteInformation();

            await fetchSiteInformation();

            toast.success(
                "Site information restored successfully."
            );

            setShowResetModal(false);

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to reset site information."

            );

        }

    };

    return (

        <div className="space-y-8">

            <SettingSection

                title="Site Information"

                description="Configure your website's branding and general information."

                icon={Globe}

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

                <SiteInformationForm

                    initialValues={siteInformation}

                    loading={loadingSiteInformation}

                    onSubmit={handleSubmit}

                />

            </SettingSection>

            <ConfirmResetModal

                open={showResetModal}

                loading={loadingSiteInformation}

                title="Reset Site Information"

                message="This will restore all site information to its default values."

                confirmText="Reset"

                variant="warning"

                onConfirm={handleReset}

                onClose={() => setShowResetModal(false)}

            />

        </div>

    );

};

export default SiteSettings;