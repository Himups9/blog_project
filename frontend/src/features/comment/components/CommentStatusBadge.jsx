import PropTypes from "prop-types";
import {
    CheckCircle2,
    Clock3,
    ShieldAlert,
    Flag,
    XCircle,
    HelpCircle,
} from "lucide-react";

const statusConfig = {
    pending: {
        label: "Pending",
        icon: Clock3,
        className:
            "bg-yellow-100 text-yellow-700 border border-yellow-200",
    },

    approved: {
        label: "Approved",
        icon: CheckCircle2,
        className:
            "bg-green-100 text-green-700 border border-green-200",
    },

    spam: {
        label: "Spam",
        icon: ShieldAlert,
        className:
            "bg-red-100 text-red-700 border border-red-200",
    },

    reported: {
        label: "Reported",
        icon: Flag,
        className:
            "bg-orange-100 text-orange-700 border border-orange-200",
    },

    rejected: {
        label: "Rejected",
        icon: XCircle,
        className:
            "bg-gray-200 text-gray-700 border border-gray-300",
    },
};

const CommentStatusBadge = ({
    status = "pending",
    size = "md",
}) => {

    const config =
        statusConfig[status] || {
            label: "Unknown",
            icon: HelpCircle,
            className:
                "bg-gray-100 text-gray-600 border border-gray-200",
        };

    const Icon = config.icon;

    const sizeClasses = {
        sm: {
            badge: "px-2 py-1 text-xs",
            icon: 12,
        },

        md: {
            badge: "px-3 py-1.5 text-sm",
            icon: 14,
        },

        lg: {
            badge: "px-4 py-2 text-base",
            icon: 16,
        },
    };

    const currentSize =
        sizeClasses[size] || sizeClasses.md;

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full font-medium ${config.className} ${currentSize.badge}`}
        >
            <Icon size={currentSize.icon} />

            {config.label}
        </span>
    );

};

CommentStatusBadge.propTypes = {
    status: PropTypes.oneOf([
        "pending",
        "approved",
        "spam",
        "reported",
        "rejected",
    ]),

    size: PropTypes.oneOf([
        "sm",
        "md",
        "lg",
    ]),
};

export default CommentStatusBadge;