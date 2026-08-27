import PropTypes from "prop-types";
import {
    AlertTriangle,
    RotateCcw,
    X,
} from "lucide-react";

const ConfirmResetModal = ({
    open = false,
    loading = false,
    title = "Reset Settings",
    message = "Are you sure you want to continue?",
    confirmText = "Reset",
    cancelText = "Cancel",
    variant = "danger",
    onConfirm,
    onClose,
}) => {

    if (!open) {

        return null;

    }

    const styles = {

        danger: {

            iconBackground: "bg-red-100",

            iconColor: "text-red-600",

            button: "bg-red-600 hover:bg-red-700",

        },

        warning: {

            iconBackground: "bg-amber-100",

            iconColor: "text-amber-600",

            button: "bg-amber-500 hover:bg-amber-600",

        },

        primary: {

            iconBackground: "bg-blue-100",

            iconColor: "text-blue-600",

            button: "bg-blue-600 hover:bg-blue-700",

        },

    };

    const currentStyle =
        styles[variant] ?? styles.danger;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-gray-200 p-6">

                    <div className="flex items-center gap-4">

                        <div
                            className={[
                                "rounded-full p-3",
                                currentStyle.iconBackground,
                            ].join(" ")}
                        >

                            <AlertTriangle
                                size={26}
                                className={currentStyle.iconColor}
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-semibold text-gray-900">

                                {title}

                            </h2>

                            <p className="mt-1 text-sm text-gray-500">

                                Confirmation Required

                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-gray-100"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* Body */}

                <div className="space-y-5 p-6">

                    <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                        <div className="flex gap-3">

                            <AlertTriangle
                                size={22}
                                className="mt-1 text-red-600"
                            />

                            <div>

                                <p className="text-sm leading-6 text-red-700">

                                    {message}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex flex-col-reverse gap-3 border-t border-gray-200 p-6 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {cancelText}

                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onConfirm}
                        className={[
                            "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50",
                            currentStyle.button,
                        ].join(" ")}
                    >

                        <RotateCcw size={18} />

                        {loading
                            ? "Processing..."
                            : confirmText}

                    </button>

                </div>

            </div>

        </div>

    );

};

ConfirmResetModal.propTypes = {

    open: PropTypes.bool,

    loading: PropTypes.bool,

    title: PropTypes.string,

    message: PropTypes.string,

    confirmText: PropTypes.string,

    cancelText: PropTypes.string,

    variant: PropTypes.oneOf([
        "danger",
        "warning",
        "primary",
    ]),

    onConfirm: PropTypes.func.isRequired,

    onClose: PropTypes.func.isRequired,

};

ConfirmResetModal.defaultProps = {

    open: false,

    loading: false,

    title: "Reset Settings",

    message: "Are you sure you want to continue?",

    confirmText: "Reset",

    cancelText: "Cancel",

    variant: "danger",

};

export default ConfirmResetModal;