import { useEffect, useState } from "react";
import { RotateCcw, Upload } from "lucide-react";
import toast from "react-hot-toast";

import SettingSection from "../components/SettingSection";
import RestoreDialog from "../components/RestoreDialog";
import ConfirmResetModal from "../components/ConfirmResetModal";

import { useSettings } from "../hooks/useSettings";

const BackupRestore = () => {

    const {

        backups,

        loadingBackups,

        fetchBackups,

        restoreBackup,

        uploadBackup,

    } = useSettings();

    const [selectedBackup, setSelectedBackup] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const [showRestoreModal, setShowRestoreModal] = useState(false);

    useEffect(() => {

        fetchBackups();

    }, []);

    const handleRestore = async () => {

        if (!selectedBackup) {

            return;

        }

        try {

            await restoreBackup(selectedBackup.id);

            toast.success("Backup restored successfully.");

            setShowRestoreModal(false);

            setSelectedBackup(null);

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to restore backup."

            );

        }

    };

    const handleUpload = async () => {

        if (!selectedFile) {

            toast.error("Please choose a backup file.");

            return;

        }

        try {

            const formData = new FormData();

            formData.append("backup", selectedFile);

            await uploadBackup(formData);

            toast.success("Backup uploaded successfully.");

            setSelectedFile(null);

            fetchBackups();

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to upload backup."

            );

        }

    };

    return (

        <div className="space-y-8">

            <SettingSection

                title="Backup Restore"

                description="Restore the application using an existing or uploaded backup."

                icon={RotateCcw}

            >

                {/* Existing Backups */}

                <div className="rounded-xl border bg-white p-6">

                    <h2 className="mb-4 text-lg font-semibold">

                        Available Backups

                    </h2>

                    <div className="space-y-3">

                        {backups?.length > 0 ? (

                            backups.map((backup) => (

                                <div
                                    key={backup.id}
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >

                                    <div>

                                        <p className="font-medium">

                                            {backup.filename}

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            {backup.created_at}

                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {

                                            setSelectedBackup(backup);

                                            setShowRestoreModal(true);

                                        }}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                    >

                                        Restore

                                    </button>

                                </div>

                            ))

                        ) : (

                            <p className="text-gray-500">

                                No backups available.

                            </p>

                        )}

                    </div>

                </div>

                {/* Upload Backup */}

                <div className="rounded-xl border bg-white p-6">

                    <h2 className="mb-4 text-lg font-semibold">

                        Upload Backup File

                    </h2>

                    <input
                        type="file"
                        accept=".zip,.sql,.bak"
                        onChange={(event) =>
                            setSelectedFile(
                                event.target.files[0]
                            )
                        }
                        className="mb-4 block w-full"
                    />

                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={loadingBackups}
                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                    >

                        <Upload size={18} />

                        Upload Backup

                    </button>

                </div>

            </SettingSection>

            <RestoreDialog

                open={showRestoreModal}

                backup={selectedBackup}

                loading={loadingBackups}

                onConfirm={handleRestore}

                onClose={() => {

                    setShowRestoreModal(false);

                    setSelectedBackup(null);

                }}

            />

        </div>

    );

};

export default BackupRestore;