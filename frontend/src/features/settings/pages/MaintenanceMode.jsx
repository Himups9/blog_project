import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";
import toast from "react-hot-toast";

import SettingSection from "../components/SettingSection";
import MaintenanceBanner from "../components/MaintenanceBanner";
import MaintenanceSchedule from "../components/MaintenanceSchedule";
import ConfirmResetModal from "../components/ConfirmResetModal";

import { useSettings } from "../hooks/useSettings";

const MaintenanceMode = () => {

    const {

        maintenanceSettings,

        loadingMaintenance,

        fetchMaintenanceSettings,

        updateMaintenanceSettings,

        enableMaintenance,

        disableMaintenance,

    } = useSettings();

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {

        fetchMaintenanceSettings();

    }, []);

    const handleSave = async (values) => {

        try {

            await updateMaintenanceSettings(values);

            toast.success(
                "Maintenance settings updated successfully."
            );

            fetchMaintenanceSettings();

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to update maintenance settings."

            );

        }

    };

    const handleToggle = () => {

        setShowConfirmModal(true);

    };

    const handleConfirm = async () => {

        try {

            if (maintenanceSettings?.enabled) {

                await disableMaintenance();

                toast.success(
                    "Maintenance mode disabled."
                );

            } else {

                await enableMaintenance();

                toast.success(
                    "Maintenance mode enabled."
                );

            }

            fetchMaintenanceSettings();

            setShowConfirmModal(false);

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to update maintenance mode."

            );

        }

    };

    return (

        <div className="space-y-8">

            {/* Banner */}

            <MaintenanceBanner

                enabled={maintenanceSettings?.enabled}

                loading={loadingMaintenance}

                onToggle={handleToggle}

            />

            {/* Schedule */}

            <SettingSection

                title="Maintenance Schedule"

                description="Configure scheduled maintenance windows and visitor messages."

                icon={Wrench}

            >

                <MaintenanceSchedule

                    initialValues={maintenanceSettings}

                    loading={loadingMaintenance}

                    onSubmit={handleSave}

                />

            </SettingSection>

            {/* Confirmation */}

            <ConfirmResetModal

                open={showConfirmModal}

                loading={loadingMaintenance}

                title={
                    maintenanceSettings?.enabled
                        ? "Disable Maintenance Mode"
                        : "Enable Maintenance Mode"
                }

                message={
                    maintenanceSettings?.enabled
                        ? "The website will immediately become available to visitors."
                        : "The website will become unavailable to visitors until maintenance mode is disabled."
                }

                confirmText={
                    maintenanceSettings?.enabled
                        ? "Disable"
                        : "Enable"
                }

                variant={
                    maintenanceSettings?.enabled
                        ? "primary"
                        : "warning"
                }

                onConfirm={handleConfirm}

                onClose={() =>
                    setShowConfirmModal(false)
                }

            />

        </div>

    );

};

export default MaintenanceMode;