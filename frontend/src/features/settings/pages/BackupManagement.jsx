import { useEffect, useState } from "react";
import { Database, Plus } from "lucide-react";
import toast from "react-hot-toast";

import BackupTable from "../components/BackupTable";
import RestoreDialog from "../components/RestoreDialog";
import SettingSection from "../components/SettingSection";
import ConfirmResetModal from "../components/ConfirmResetModal";

import { useSettings } from "../hooks/useSettings";

const BackupManagement = () => {

    const {

        backups,
        loadingBackups,

        fetchBackups,
        createBackup,
        restoreBackup,
        deleteBackup,

    } = useSettings();

    const [selectedBackup, setSelectedBackup] = useState(null);

    const [showRestoreDialog, setShowRestoreDialog] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {

        fetchBackups();

    }, []);

    const handleCreateBackup = async () => {

        try {

            await createBackup();

            toast.success("Backup created successfully.");

            fetchBackups();

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to create backup."

            );

        }

    };

    const handleRestore = async () => {

        if (!selectedBackup) {

            return;

        }

        try {

            await restoreBackup(selectedBackup.id);

            toast.success("Backup restored successfully.");

            setShowRestoreDialog(false);

            setSelectedBackup(null);

            fetchBackups();

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to restore backup."

            );

        }

    };

    const handleDelete = async () => {

        if (!selectedBackup) {

            return;

        }

        try {

            await deleteBackup(selectedBackup.id);

            toast.success("Backup deleted successfully.");

            setShowDeleteDialog(false);

            setSelectedBackup(null);

            fetchBackups();

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to delete backup."

            );

        }

    };

    return (

        <div className="space-y-8">

            <SettingSection

                title="Backup Management"

                description="Create, restore and manage your system backups."

                icon={Database}

                actions={

                    <button
                        type="button"
                        onClick={handleCreateBackup}
                        disabled={loadingBackups}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <Plus size={18} />

                        Create Backup

                    </button>

                }

            >

                <BackupTable

                    backups={backups}

                    loading={loadingBackups}

                    onRestore={(backup) => {

                        setSelectedBackup(backup);

                        setShowRestoreDialog(true);

                    }}

                    onDelete={(backup) => {

                        setSelectedBackup(backup);

                        setShowDeleteDialog(true);

                    }}

                />

            </SettingSection>

            {/* Restore */}

            <RestoreDialog

                open={showRestoreDialog}

                backup={selectedBackup}

                loading={loadingBackups}

                onConfirm={handleRestore}

                onClose={() => {

                    setShowRestoreDialog(false);

                    setSelectedBackup(null);

                }}

            />

            {/* Delete */}

            <ConfirmResetModal

                open={showDeleteDialog}

                loading={loadingBackups}

                title="Delete Backup"

                message="This backup will be permanently deleted and cannot be recovered."

                confirmText="Delete Backup"

                variant="danger"

                onConfirm={handleDelete}

                onClose={() => {

                    setShowDeleteDialog(false);

                    setSelectedBackup(null);

                }}

            />

        </div>

    );

};

export default BackupManagement;