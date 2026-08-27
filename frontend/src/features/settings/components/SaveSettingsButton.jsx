import PropTypes from "prop-types";
import {
    Loader2,
    Save,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

const SaveSettingsButton = ({
    onClick,
    loading = false,
    success = false,
    error = false,
    disabled = false,
    text = "Save Changes",
    loadingText = "Saving...",
    successText = "Saved",
    errorText = "Try Again",
    fullWidth = false,
    className = "",
    icon = null,
    type = "button",
}) => {

    const isDisabled =
        disabled || loading;

    const getIcon = () => {

        if (loading) {
            return (
                <Loader2
                    size={18}
                    className="animate-spin"
                />
            );
        }

        if (success) {
            return (
                <CheckCircle size={18} />
            );
        }

        if (error) {
            return (
                <AlertCircle size={18} />
            );
        }

        if (icon) {
            return icon;
        }

        return <Save size={18} />;

    };

    const getText = () => {

        if (loading) {
            return loadingText;
        }

        if (success) {
            return successText;
        }

        if (error) {
            return errorText;
        }

        return text;

    };

    const buttonClasses = [
        "inline-flex items-center justify-center gap-2",
        "rounded-xl px-5 py-3",
        "font-medium",
        "transition-all duration-200",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-blue-300",

        fullWidth
            ? "w-full"
            : "",

        isDisabled
            ? "cursor-not-allowed bg-gray-300 text-gray-500"
            : success
                ? "bg-green-600 text-white hover:bg-green-700"
                : error
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg",

        className,
    ].join(" ");

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={buttonClasses}
        >
            {getIcon()}

            <span>{getText()}</span>
        </button>
    );

};

SaveSettingsButton.propTypes = {
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    loadingText: PropTypes.string,
    successText: PropTypes.string,
    errorText: PropTypes.string,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.node,
    type: PropTypes.oneOf([
        "button",
        "submit",
        "reset",
    ]),
};

export default SaveSettingsButton;