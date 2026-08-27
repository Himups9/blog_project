import PropTypes from "prop-types";
import {
    Download,
    RotateCcw,
    Trash2,
    Search,
    Database,
} from "lucide-react";

const BackupTable = ({
    backups,
    loading,
    search,
    onSearch,
    onDownload,
    onRestore,
    onDelete,
}) => {

    /* =====================================
       Loading State
    ===================================== */

    if (loading) {

        return (

            <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center shadow-sm">

                <Database
                    size={48}
                    className="mx-auto mb-4 animate-pulse text-gray-400"
                />

                <h3 className="text-lg font-semibold text-gray-800">

                    Loading Backups

                </h3>

                <p className="mt-2 text-sm text-gray-500">

                    Please wait while backup information is being loaded.

                </p>

            </div>

        );

    }

    return (

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* =====================================
                Header
            ===================================== */}

            <div className="flex flex-col gap-5 border-b border-gray-200 p-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h2 className="text-xl font-semibold text-gray-900">

                        Database Backups

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Manage manual and automatic database backups.

                    </p>

                </div>

                {/* Search */}

                <div className="relative w-full lg:w-80">

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            onSearch(event.target.value)
                        }
                        placeholder="Search backups..."
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            py-2.5
                            pl-10
                            pr-4
                            text-sm
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-200
                        "
                    />

                </div>

            </div>

                        {/* =====================================
                Backup Table
            ===================================== */}

            <div className="overflow-x-auto">

                <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">

                                Backup Name

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">

                                Type

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">

                                Size

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">

                                Status

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">

                                Created

                            </th>

                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">

                        {backups.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="px-6 py-16 text-center"
                                >

                                    <Database
                                        size={42}
                                        className="mx-auto mb-4 text-gray-300"
                                    />

                                    <h3 className="text-lg font-semibold text-gray-700">

                                        No Backups Found

                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">

                                        Create your first backup to protect your database.

                                    </p>

                                </td>

                            </tr>

                        ) : (

                            backups.map((backup) => (

                                <tr
                                    key={backup.id}
                                    className="transition-colors hover:bg-gray-50"
                                >

                                    {/* Backup Name */}

                                    <td className="px-6 py-5">

                                        <div className="font-medium text-gray-900">

                                            {backup.filename}

                                        </div>

                                    </td>

                                    {/* Type */}

                                    <td className="px-6 py-5">

                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                backup.type === "manual"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-emerald-100 text-emerald-700"
                                            }`}
                                        >

                                            {backup.type === "manual"
                                                ? "Manual"
                                                : "Automatic"}

                                        </span>

                                    </td>

                                    {/* File Size */}

                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">

                                        {backup.file_size}

                                    </td>

                                    {/* Status */}

                                    <td className="px-6 py-5">

                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                backup.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : backup.status === "processing"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : backup.status === "failed"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-gray-100 text-gray-700"
                                            }`}
                                        >

                                            {backup.status}

                                        </span>

                                    </td>

                                    {/* Created Date */}

                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">

                                        {new Date(
                                            backup.created_at
                                        ).toLocaleString()}

                                    </td>

                                    {/* Actions */}

                                    <td className="px-6 py-5">

                                        <div className="flex justify-end gap-2">

                                            <button
                                                type="button"
                                                onClick={() => onDownload(backup)}
                                                className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
                                                title="Download Backup"
                                            >

                                                <Download size={18} />

                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onRestore(backup)}
                                                className="rounded-lg p-2 text-amber-600 transition hover:bg-amber-100"
                                                title="Restore Backup"
                                            >

                                                <RotateCcw size={18} />

                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onDelete(backup)}
                                                className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
                                                title="Delete Backup"
                                            >

                                                <Trash2 size={18} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

                    </div>

    );

};

BackupTable.propTypes = {

    backups: PropTypes.arrayOf(

        PropTypes.shape({

            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]).isRequired,

            filename: PropTypes.string.isRequired,

            type: PropTypes.oneOf([
                "manual",
                "automatic",
            ]).isRequired,

            file_size: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,

            status: PropTypes.oneOf([
                "completed",
                "processing",
                "failed",
            ]).isRequired,

            created_at: PropTypes.string.isRequired,

        })

    ),

    loading: PropTypes.bool,

    search: PropTypes.string,

    onSearch: PropTypes.func.isRequired,

    onDownload: PropTypes.func.isRequired,

    onRestore: PropTypes.func.isRequired,

    onDelete: PropTypes.func.isRequired,

};

BackupTable.defaultProps = {

    backups: [],

    loading: false,

    search: "",

};

export default BackupTable;