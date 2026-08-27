import PropTypes from "prop-types";
import {
    Server,
    Database,
    Cpu,
    HardDrive,
    MemoryStick,
    Clock3,
    Globe,
    Code2,
    RefreshCw,
} from "lucide-react";

const SystemInfoCard = ({
    systemInfo,
    loading = false,
    onRefresh,
}) => {

    const cards = [
        {
            title: "Server",
            value: systemInfo.server_name,
            icon: Server,
        },
        {
            title: "Operating System",
            value: systemInfo.operating_system,
            icon: Cpu,
        },
        {
            title: "Python Version",
            value: systemInfo.python_version,
            icon: Code2,
        },
        {
            title: "Django Version",
            value: systemInfo.django_version,
            icon: Globe,
        },
        {
            title: "Database",
            value: systemInfo.database,
            icon: Database,
        },
        {
            title: "Environment",
            value: systemInfo.environment,
            icon: Globe,
        },
        {
            title: "Storage Usage",
            value: systemInfo.storage_usage,
            icon: HardDrive,
        },
        {
            title: "Memory Usage",
            value: systemInfo.memory_usage,
            icon: MemoryStick,
        },
        {
            title: "System Uptime",
            value: systemInfo.uptime,
            icon: Clock3,
        },
    ];

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h2 className="text-xl font-semibold text-gray-900">

                            System Information

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            Overview of your application and server environment.

                        </p>

                    </div>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onRefresh}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2 transition hover:bg-gray-100 disabled:opacity-50"
                    >

                        <RefreshCw
                            size={18}
                            className={loading ? "animate-spin" : ""}
                        />

                        Refresh

                    </button>

                </div>

            </div>

            {/* Information Grid */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {cards.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
                        >

                            <div className="flex items-center gap-4">

                                <div className="rounded-xl bg-blue-50 p-3">

                                    <Icon
                                        size={24}
                                        className="text-blue-600"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm text-gray-500">

                                        {item.title}

                                    </p>

                                    <h3 className="mt-1 break-all text-lg font-semibold text-gray-900">

                                        {item.value || "N/A"}

                                    </h3>

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* Footer */}

            <div className="rounded-2xl border bg-blue-50 p-5">

                <p className="text-sm text-blue-700">

                    This information is collected from the Django backend and
                    is intended for administrators only. It can be used for
                    troubleshooting, monitoring deployments, and verifying
                    server configuration.

                </p>

            </div>

        </div>

    );

};

SystemInfoCard.propTypes = {

    systemInfo: PropTypes.shape({

        server_name: PropTypes.string,

        operating_system: PropTypes.string,

        python_version: PropTypes.string,

        django_version: PropTypes.string,

        database: PropTypes.string,

        environment: PropTypes.string,

        storage_usage: PropTypes.string,

        memory_usage: PropTypes.string,

        uptime: PropTypes.string,

    }),

    loading: PropTypes.bool,

    onRefresh: PropTypes.func.isRequired,

};

SystemInfoCard.defaultProps = {

    systemInfo: {

        server_name: "Unknown",

        operating_system: "Unknown",

        python_version: "Unknown",

        django_version: "Unknown",

        database: "Unknown",

        environment: "Development",

        storage_usage: "0 GB",

        memory_usage: "0 MB",

        uptime: "Unknown",

    },

    loading: false,

};

export default SystemInfoCard;