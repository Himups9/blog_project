import PropTypes from "prop-types";
import {
    AlertTriangle,
    Database,
    Calendar,
    HardDrive,
    RotateCcw,
    X,
} from "lucide-react";

const RestoreDialog = ({
    open,
    backup,
    restoring = false,
    onClose,
    onConfirm,
}) => {

    if (!open || !backup) {

        return null;

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b p-6">

                    <div className="flex items-center gap-3">

                        <div className="rounded-full bg-amber-100 p-3">

                            <AlertTriangle
                                className="text-amber-600"
                                size={24}
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-semibold">

                                Restore Backup

                            </h2>

                            <p className="text-sm text-gray-500">

                                Please review the information before restoring.

                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={restoring}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* Backup Details */}

                <div className="space-y-6 p-6">

                    <div className="rounded-xl border bg-gray-50 p-5">

                        <div className="grid gap-5 md:grid-cols-2">

                            <div className="flex items-center gap-3">

                                <Database
                                    size={20}
                                    className="text-blue-600"
                                />

                                <div>

                                    <p className="text-xs text-gray-500">

                                        Backup File

                                    </p>

                                    <p className="font-medium">

                                        {backup.filename}

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <HardDrive
                                    size={20}
                                    className="text-green-600"
                                />

                                <div>

                                    <p className="text-xs text-gray-500">

                                        File Size

                                    </p>

                                    <p className="font-medium">

                                        {backup.file_size}

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <Calendar
                                    size={20}
                                    className="text-indigo-600"
                                />

                                <div>

                                    <p className="text-xs text-gray-500">

                                        Created

                                    </p>

                                    <p className="font-medium">

                                        {backup.created_at}

                                    </p>

                                </div>

                            </div>

                            <div>

                                <p className="text-xs text-gray-500">

                                    Backup Type

                                </p>

                                <span
                                    className={[
                                        "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                                        backup.type === "manual"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-emerald-100 text-emerald-700",
                                    ].join(" ")}
                                >

                                    {backup.type === "manual"
                                        ? "Manual"
                                        : "Automatic"}

                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Warning */}

                    <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                        <div className="flex gap-3">

                            <AlertTriangle
                                size={22}
                                className="mt-1 text-red-600"
                            />

                            <div>

                                <h3 className="font-semibold text-red-700">

                                    Warning

                                </h3>

                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-600">

                                    <li>

                                        Restoring a backup will overwrite the current database.

                                    </li>

                                    <li>

                                        Recent data may be permanently lost.

                                    </li>

                                    <li>

                                        Ensure you have a current backup before continuing.

                                    </li>

                                    <li>

                                        This operation may take several minutes.

                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex flex-col-reverse gap-3 border-t p-6 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        disabled={restoring}
                        onClick={onClose}
                        className="rounded-xl border border-gray-300 px-5 py-3 font-medium hover:bg-gray-100"
                    >

                        Cancel

                    </button>

                    <button
                        type="button"
                        disabled={restoring}
                        onClick={() => onConfirm(backup)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <RotateCcw size={18} />

                        {restoring
                            ? "Restoring..."
                            : "Restore Backup"}

                    </button>

                </div>

            </div>

        </div>

    );

};

RestoreDialog.propTypes = {

    open: PropTypes.bool,

    backup: PropTypes.shape({

        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),

        filename: PropTypes.string,

        file_size: PropTypes.string,

        created_at: PropTypes.string,

        type: PropTypes.oneOf([
            "manual",
            "automatic",
        ]),

    }),

    restoring: PropTypes.bool,

    onClose: PropTypes.func.isRequired,

    onConfirm: PropTypes.func.isRequired,

};

RestoreDialog.defaultProps = {

    open: false,

    backup: null,

    restoring: false,

};

export default RestoreDialog;