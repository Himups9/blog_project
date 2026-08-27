import PropTypes from "prop-types";

const SettingsTabs = ({
    tabs,
    activeTab,
    onChange,
    className = "",
}) => {
    return (
        <div
            className={`overflow-x-auto rounded-2xl border border-gray-200 bg-white ${className}`}
        >
            <div className="flex min-w-max gap-2 p-2">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.value;

                    return (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => onChange(tab.value)}
                            disabled={tab.disabled}
                            className={[
                                "flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200",
                                tab.disabled
                                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                    : isActive
                                      ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                                      : "text-gray-600 hover:bg-gray-100 hover:text-blue-600",
                            ].join(" ")}
                        >
                            {tab.icon && (
                                <span className="flex items-center">
                                    {tab.icon}
                                </span>
                            )}

                            <span>{tab.label}</span>

                            {typeof tab.badge !== "undefined" && (
                                <span
                                    className={[
                                        "rounded-full px-2 py-0.5 text-xs",
                                        isActive
                                            ? "bg-white/20 text-white"
                                            : "bg-gray-200 text-gray-700",
                                    ].join(" ")}
                                >
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

SettingsTabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.node,
            badge: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            disabled: PropTypes.bool,
        })
    ).isRequired,
    activeTab: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default SettingsTabs;