import PropTypes from "prop-types";

const SettingsCard = ({
    title,
    description,
    icon,
    headerAction,
    footer,
    children,
    loading = false,
    className = "",
    bodyClassName = "",
}) => {
    return (
        <div
            className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md ${className}`}
        >
            {/* ============================
                Header
            ============================ */}

            {(title || description || icon || headerAction) && (
                <div className="flex flex-col gap-4 border-b border-gray-200 p-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                        {icon && (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                {icon}
                            </div>
                        )}

                        <div>
                            {title && (
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {title}
                                </h2>
                            )}

                            {description && (
                                <p className="mt-1 text-sm text-gray-500">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>

                    {headerAction && (
                        <div className="flex shrink-0 items-center">
                            {headerAction}
                        </div>
                    )}
                </div>
            )}

            {/* ============================
                Body
            ============================ */}

            <div className={`p-6 ${bodyClassName}`}>
                {loading ? (
                    <div className="space-y-4">
                        <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                        <div className="h-32 animate-pulse rounded-xl bg-gray-100" />
                    </div>
                ) : (
                    children
                )}
            </div>

            {/* ============================
                Footer
            ============================ */}

            {footer && (
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                    {footer}
                </div>
            )}
        </div>
    );
};

SettingsCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.node,
    headerAction: PropTypes.node,
    footer: PropTypes.node,
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool,
    className: PropTypes.string,
    bodyClassName: PropTypes.string,
};

export default SettingsCard;