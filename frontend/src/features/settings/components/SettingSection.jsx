import PropTypes from "prop-types";

const SettingSection = ({
    title,
    description,
    icon: Icon,
    actions,
    children,
    className = "",
}) => {

    return (

        <section
            className={[
                "overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",
                className,
            ].join(" ")}
        >

            {/* Header */}

            <div className="border-b border-gray-200 px-6 py-5">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-start gap-4">

                        {Icon && (

                            <div className="rounded-xl bg-blue-50 p-3">

                                <Icon
                                    size={24}
                                    className="text-blue-600"
                                />

                            </div>

                        )}

                        <div>

                            <h2 className="text-xl font-semibold text-gray-900">

                                {title}

                            </h2>

                            {description && (

                                <p className="mt-1 text-sm text-gray-500">

                                    {description}

                                </p>

                            )}

                        </div>

                    </div>

                    {actions && (

                        <div className="flex flex-wrap items-center gap-3">

                            {actions}

                        </div>

                    )}

                </div>

            </div>

            {/* Content */}

            <div className="p-6">

                {children}

            </div>

        </section>

    );

};

SettingSection.propTypes = {

    title: PropTypes.string.isRequired,

    description: PropTypes.string,

    icon: PropTypes.elementType,

    actions: PropTypes.node,

    children: PropTypes.node.isRequired,

    className: PropTypes.string,

};

SettingSection.defaultProps = {

    description: "",

    icon: null,

    actions: null,

    className: "",

};

export default SettingSection;