import { LogOut, X, ShieldAlert } from "lucide-react";

export default function LogoutConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    loading = false,
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget && !loading) {
                    onClose();
                }
            }}
        >

            {/* Modal */}

            <div
                className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl"
                onMouseDown={(e) => e.stopPropagation()}
            >

                {/* Top Accent */}

                <div className="h-1.5 bg-linear-to-r from-red-500 via-rose-500 to-orange-500" />


                {/* Header */}

                <div className="flex items-center justify-between px-6 pt-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">

                            <ShieldAlert className="h-5 w-5" />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Confirm Logout
                            </h2>

                            <p className="text-xs text-slate-500">
                                Account security
                            </p>

                        </div>

                    </div>


                    {/* Close */}

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close logout confirmation"
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X className="h-5 w-5" />
                    </button>

                </div>


                {/* Body */}

                <div className="px-6 py-8">

                    {/* Logout Icon */}

                    <div className="mb-6 flex justify-center">

                        <div className="relative">

                            {/* Outer Glow */}

                            <div className="absolute inset-0 rounded-full bg-red-100 blur-xl" />

                            {/* Icon Container */}

                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-8 border-red-50 bg-linear-to-br from-red-500 to-rose-600 text-white shadow-lg">

                                <LogOut className="h-9 w-9" />

                            </div>

                        </div>

                    </div>


                    {/* Message */}

                    <div className="text-center">

                        <h3 className="text-xl font-bold text-slate-900">
                            Are you sure you want to logout?
                        </h3>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                            You will be signed out of your account.
                            You can sign in again anytime using your
                            account credentials.
                        </p>

                    </div>


                    {/* Security Notice */}

                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">

                        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />

                        <p className="text-xs leading-5 text-slate-500">
                            For your security, make sure you have saved
                            any unfinished work before logging out.
                        </p>

                    </div>

                </div>


                {/* Footer */}

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:justify-end">

                    {/* Cancel */}

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Stay Logged In
                    </button>


                    {/* Logout */}

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-red-500 to-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all duration-200 hover:from-red-600 hover:to-rose-700 hover:shadow-lg hover:shadow-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />

                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                                Logging out...
                            </>
                        ) : (
                            "Logout"
                        )}

                    </button>

                </div>

            </div>

        </div>
    );
}