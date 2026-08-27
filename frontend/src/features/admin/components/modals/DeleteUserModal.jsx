// frontend/src/admin/components/modals/DeleteUserModal.jsx

import { useEffect } from "react";
import {
    AlertTriangle,
    Trash2,
    X,
} from "lucide-react";

export default function DeleteUserModal({
    open,
    user,
    loading = false,
    onClose,
    onConfirm,
}) {
    /*
    |--------------------------------------------------------------------------
    | Escape Key
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!open) return;

        const handleEscape = (event) => {
            if (
                event.key === "Escape" &&
                !loading
            ) {
                onClose();
            }
        };

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [open, loading, onClose]);

    /*
    |--------------------------------------------------------------------------
    | Don't Render
    |--------------------------------------------------------------------------
    */

    if (!open || !user) {
        return null;
    }

    /*
    |--------------------------------------------------------------------------
    | User Information
    |--------------------------------------------------------------------------
    */

    const firstName =
        user.firstName || "";

    const lastName =
        user.lastName || "";

    const fullName =
        `${firstName} ${lastName}`.trim() ||
        "Unknown User";

    const email =
        user.email || "No email available";

    const profileImage =
        user.profileImage || null;

    const initials =
        `${firstName?.[0] || ""}${lastName?.[0] || ""}`
            .toUpperCase() || "U";

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => {
                if (!loading) {
                    onClose();
                }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-user-title"
        >
            {/* Modal */}

            <div
                className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">

                            <AlertTriangle
                                size={22}
                                className="text-red-600"
                            />

                        </div>

                        <div>

                            <h2
                                id="delete-user-title"
                                className="text-lg font-bold text-slate-800"
                            >
                                Delete User
                            </h2>

                            <p className="text-sm text-slate-500">
                                Please confirm this action
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close modal"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Body */}

                <div className="px-6 py-6">

                    {/* User Card */}

                    <div className="mb-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

                        {/* Avatar */}

                        {profileImage ? (

                            <img
                                src={profileImage}
                                alt={fullName}
                                className="h-16 w-16 shrink-0 rounded-full border-2 border-white object-cover shadow"
                            />

                        ) : (

                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-red-500 to-rose-600 text-lg font-bold text-white shadow">

                                {initials}

                            </div>

                        )}

                        {/* User Details */}

                        <div className="min-w-0">

                            <h3 className="truncate font-semibold text-slate-800">

                                {fullName}

                            </h3>

                            <p className="mt-1 truncate text-sm text-slate-500">

                                {email}

                            </p>

                            {user.role && (
                                <span className="mt-2 inline-flex rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">

                                    {typeof user.role ===
                                    "string"
                                        ? user.role.toLowerCase()
                                        : user.role?.name?.toLowerCase() ||
                                          "user"}

                                </span>
                            )}

                        </div>

                    </div>

                    {/* Warning */}

                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                        <div className="flex gap-3">

                            <AlertTriangle
                                size={20}
                                className="mt-0.5 shrink-0 text-red-600"
                            />

                            <div>

                                <p className="text-sm font-medium leading-6 text-red-800">

                                    Are you sure you want to delete this user?

                                </p>

                                <p className="mt-1 text-sm leading-6 text-red-700">

                                    This action will remove the
                                    user's account and cannot be
                                    undone.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

                    {/* Cancel */}

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Cancel
                    </button>

                    {/* Delete */}

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <Trash2
                            size={17}
                        />

                        {loading
                            ? "Deleting..."
                            : "Delete User"}

                    </button>

                </div>

            </div>
        </div>
    );
}