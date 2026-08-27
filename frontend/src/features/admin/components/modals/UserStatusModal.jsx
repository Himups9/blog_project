import { useEffect } from "react";
import {
    AlertTriangle,
    CheckCircle2,
    UserRound,
    X,
} from "lucide-react";

export default function UserStatusModal({
    open,
    user,
    onClose,
    onConfirm,
    loading = false,
}) {
    /*
    |--------------------------------------------------------------------------
    | Escape Key
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!open) {
            return;
        }

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

    if (!open || !user) {
        return null;
    }

    /*
    |--------------------------------------------------------------------------
    | User Information
    |--------------------------------------------------------------------------
    */

    const isActive = Boolean(user.isActive);

    const action = isActive
        ? "deactivate"
        : "activate";

    const actionTitle = isActive
        ? "Deactivate User"
        : "Activate User";

    const fullName =
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "User";

    const initials =
        `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`
            .toUpperCase() || "U";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => {
                if (!loading) {
                    onClose();
                }
            }}
        >
            {/* Modal */}

            <div
                className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {/* =====================================================
                    Header
                ====================================================== */}

                <div
                    className={`relative overflow-hidden px-6 py-5 ${
                        isActive
                            ? "bg-linear-to-r from-red-500 to-rose-600"
                            : "bg-linear-to-r from-emerald-500 to-teal-600"
                    }`}
                >
                    {/* Decorative circle */}

                    <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/10" />

                    <div className="relative flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">

                                {isActive ? (
                                    <AlertTriangle
                                        size={22}
                                        className="text-white"
                                    />
                                ) : (
                                    <CheckCircle2
                                        size={22}
                                        className="text-white"
                                    />
                                )}

                            </div>

                            <div>

                                <h2 className="text-lg font-bold text-white">
                                    {actionTitle}
                                </h2>

                                <p className="text-sm text-white/80">
                                    Manage account status
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-lg p-2 text-white/80 transition hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                    </div>
                </div>

                {/* =====================================================
                    Body
                ====================================================== */}

                <div className="p-6">

                    {/* User Card */}

                    <div className="mb-5 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

                        {user.profileImage ? (

                            <img
                                src={user.profileImage}
                                alt={fullName}
                                className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-sm"
                            />

                        ) : (

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-teal-600 to-cyan-600 text-sm font-bold text-white ring-2 ring-white shadow-sm">
                                {initials}
                            </div>

                        )}

                        <div className="min-w-0">

                            <h3 className="truncate font-semibold text-slate-800">
                                {fullName}
                            </h3>

                            <p className="mt-1 truncate text-sm text-slate-500">
                                {user.email}
                            </p>

                        </div>

                    </div>

                    {/* Message */}

                    <div
                        className={`rounded-xl border p-4 ${
                            isActive
                                ? "border-red-200 bg-red-50"
                                : "border-emerald-200 bg-emerald-50"
                        }`}
                    >

                        <div className="flex gap-3">

                            {isActive ? (
                                <AlertTriangle
                                    size={20}
                                    className="mt-0.5 shrink-0 text-red-600"
                                />
                            ) : (
                                <CheckCircle2
                                    size={20}
                                    className="mt-0.5 shrink-0 text-emerald-600"
                                />
                            )}

                            <div>

                                <p
                                    className={`text-sm font-medium ${
                                        isActive
                                            ? "text-red-800"
                                            : "text-emerald-800"
                                    }`}
                                >
                                    Are you sure you want to{" "}
                                    {action} this user?
                                </p>

                                <p
                                    className={`mt-1 text-sm leading-5 ${
                                        isActive
                                            ? "text-red-700"
                                            : "text-emerald-700"
                                    }`}
                                >
                                    {isActive
                                        ? "The user will no longer be able to access their account until it is activated again."
                                        : "The user will regain access to their account after activation."}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =====================================================
                    Footer
                ====================================================== */}

                <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                            isActive
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                {isActive
                                    ? "Deactivating..."
                                    : "Activating..."}
                            </>
                        ) : (
                            <>
                                {isActive ? (
                                    <AlertTriangle
                                        size={17}
                                    />
                                ) : (
                                    <CheckCircle2
                                        size={17}
                                    />
                                )}

                                {isActive
                                    ? "Deactivate"
                                    : "Activate"}
                            </>
                        )}
                    </button>

                </div>

            </div>
        </div>
    );
}