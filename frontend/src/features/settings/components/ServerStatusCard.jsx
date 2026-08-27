import PropTypes from "prop-types";
import {
    Activity,
    Cpu,
    HardDrive,
    MemoryStick,
    Network,
    RefreshCw,
    Server,
    CheckCircle2,
    AlertTriangle,
    XCircle,
} from "lucide-react";

const statusClasses = {
    healthy: {
        badge: "bg-green-100 text-green-700",
        icon: CheckCircle2,
    },
    warning: {
        badge: "bg-yellow-100 text-yellow-700",
        icon: AlertTriangle,
    },
    critical: {
        badge: "bg-red-100 text-red-700",
        icon: XCircle,
    },
};

const ProgressBar = ({ value, color }) => (

    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">

        <div
            className={color}
            style={{ width: `${Math.min(value, 100)}%` }}
        />

    </div>

);

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
};

const MetricCard = ({
    title,
    value,
    icon: Icon,
    color,
}) => (

    <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

            <div>

                <p className="text-sm text-gray-500">

                    {title}

                </p>

                <h3 className="mt-2 text-2xl font-bold">

                    {value}%

                </h3>

            </div>

            <div className="rounded-xl bg-gray-50 p-3">

                <Icon
                    size={24}
                    className={color}
                />

            </div>

        </div>

        <ProgressBar
            value={value}
            color={color.replace("text-", "bg-")}
        />

    </div>

);

MetricCard.propTypes = {

    title: PropTypes.string.isRequired,

    value: PropTypes.number.isRequired,

    icon: PropTypes.elementType.isRequired,

    color: PropTypes.string.isRequired,

};

const ServerStatusCard = ({
    status,
    loading = false,
    onRefresh,
}) => {

    const StatusIcon =
        statusClasses[status.health]?.icon ??
        CheckCircle2;

    const badgeClass =
        statusClasses[status.health]?.badge ??
        "bg-green-100 text-green-700";

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h2 className="text-xl font-semibold">

                            Server Status

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            Live monitoring of your application server.

                        </p>

                    </div>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onRefresh}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2 hover:bg-gray-100 disabled:opacity-50"
                    >

                        <RefreshCw
                            size={18}
                            className={loading ? "animate-spin" : ""}
                        />

                        Refresh

                    </button>

                </div>

            </div>

            {/* Overall Status */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <div className="rounded-full bg-gray-100 p-3">

                            <StatusIcon size={24} />

                        </div>

                        <div>

                            <h3 className="font-semibold">

                                Overall Health

                            </h3>

                            <span
                                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}
                            >

                                {status.health}

                            </span>

                        </div>

                    </div>

                    <div className="text-right">

                        <p className="text-sm text-gray-500">

                            Last Updated

                        </p>

                        <p className="font-medium">

                            {status.last_updated}

                        </p>

                    </div>

                </div>

            </div>

            {/* Metrics */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <MetricCard
                    title="CPU Usage"
                    value={status.cpu}
                    icon={Cpu}
                    color="text-blue-600"
                />

                <MetricCard
                    title="Memory Usage"
                    value={status.memory}
                    icon={MemoryStick}
                    color="text-green-600"
                />

                <MetricCard
                    title="Disk Usage"
                    value={status.disk}
                    icon={HardDrive}
                    color="text-orange-600"
                />

                <MetricCard
                    title="Network Usage"
                    value={status.network}
                    icon={Network}
                    color="text-purple-600"
                />

            </div>

            {/* Running Services */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">

                    <Server
                        className="text-blue-600"
                        size={24}
                    />

                    <h3 className="text-lg font-semibold">

                        Running Services

                    </h3>

                </div>

                <div className="grid gap-4 md:grid-cols-2">

                    {status.services.map((service) => (

                        <div
                            key={service.name}
                            className="flex items-center justify-between rounded-xl border p-4"
                        >

                            <div className="flex items-center gap-3">

                                <Activity
                                    className={
                                        service.running
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }
                                    size={18}
                                />

                                <span className="font-medium">

                                    {service.name}

                                </span>

                            </div>

                            <span
                                className={[
                                    "rounded-full px-3 py-1 text-xs font-medium",
                                    service.running
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700",
                                ].join(" ")}
                            >

                                {service.running
                                    ? "Running"
                                    : "Stopped"}

                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

};

ServerStatusCard.propTypes = {

    status: PropTypes.shape({

        health: PropTypes.oneOf([
            "healthy",
            "warning",
            "critical",
        ]),

        cpu: PropTypes.number,

        memory: PropTypes.number,

        disk: PropTypes.number,

        network: PropTypes.number,

        last_updated: PropTypes.string,

        services: PropTypes.arrayOf(

            PropTypes.shape({

                name: PropTypes.string.isRequired,

                running: PropTypes.bool.isRequired,

            })

        ),

    }),

    loading: PropTypes.bool,

    onRefresh: PropTypes.func.isRequired,

};

ServerStatusCard.defaultProps = {

    status: {

        health: "healthy",

        cpu: 0,

        memory: 0,

        disk: 0,

        network: 0,

        last_updated: "--",

        services: [],

    },

    loading: false,

};

export default ServerStatusCard;