// frontend/src/features/dashboard/components/StatCard.jsx

import React from "react";
import PropTypes from "prop-types";

const StatCard = ({
    title,
    value,
    icon: Icon,
}) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                        {value}
                    </p>
                </div>

                {Icon && (
                    <div className="shrink-0 rounded-lg bg-gray-100 p-3">
                        <Icon
                            className="h-6 w-6 text-gray-600"
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    icon: PropTypes.elementType,
};

StatCard.defaultProps = {
    icon: null,
};

export default StatCard;