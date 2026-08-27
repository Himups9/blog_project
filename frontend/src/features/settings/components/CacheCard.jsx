import PropTypes from "prop-types";
import {
    Database,
    Trash2,
    RefreshCw,
    Layers,
    Monitor,
    HardDrive,
    Clock,
    LoaderCircle,
} from "lucide-react";

const CacheCard = ({
    stats,
    loading = false,
    clearing = false,
    onRefresh,
    onClearApplication,
    onClearTemplate,
    onClearStatic,
    onClearSession,
    onClearAll,
}) => {

    const cacheCards = [
        {
            title: "Application Cache",
            description: "Cached API responses and application data.",
            icon: Database,
            action: onClearApplication,
        },
        {
            title: "Template Cache",
            description: "Compiled Django templates.",
            icon: Layers,
            action: onClearTemplate,
        },
        {
            title: "Static Cache",
            description: "Static assets and generated files.",
            icon: Monitor,
            action: onClearStatic,
        },
        {
            title: "Session Cache",
            description: "User sessions and authentication cache.",
            icon: Clock,
            action: onClearSession,
        },
    ];

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h2 className="text-xl font-semibold text-gray-900">

                            Cache Management

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            Monitor cache usage and clear cached data.

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-100 disabled:opacity-50"
                    >

                        <RefreshCw
                            size={18}
                            className={loading ? "animate-spin" : ""}
                        />

                        Refresh

                    </button>

                </div>

            </div>

            {/* Statistics */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border bg-white p-5 shadow-sm">

                    <HardDrive
                        className="mb-3 text-blue-600"
                        size={26}
                    />

                    <p className="text-sm text-gray-500">

                        Total Cache Size

                    </p>

                    <h3 className="mt-2 text-2xl font-bold">

                        {stats.total_size}

                    </h3>

                </div>

                <div className="rounded-2xl border bg-white p-5 shadow-sm">

                    <Database
                        className="mb-3 text-green-600"
                        size={26}
                    />

                    <p className="text-sm text-gray-500">

                        Cached Items

                    </p>

                    <h3 className="mt-2 text-2xl font-bold">

                        {stats.total_items}

                    </h3>

                </div>

                <div className="rounded-2xl border bg-white p-5 shadow-sm">

                    <Clock
                        className="mb-3 text-orange-600"
                        size={26}
                    />

                    <p className="text-sm text-gray-500">

                        Last Cleared

                    </p>

                    <h3 className="mt-2 text-lg font-semibold">

                        {stats.last_cleared}

                    </h3>

                </div>

                <div className="rounded-2xl border bg-white p-5 shadow-sm">

                    <Layers
                        className="mb-3 text-purple-600"
                        size={26}
                    />

                    <p className="text-sm text-gray-500">

                        Cache Driver

                    </p>

                    <h3 className="mt-2 text-lg font-semibold">

                        {stats.driver}

                    </h3>

                </div>

            </div>

            {/* Cache Types */}

            <div className="grid gap-6 lg:grid-cols-2">

                {cacheCards.map((cache) => {

                    const Icon = cache.icon;

                    return (

                        <div
                            key={cache.title}
                            className="rounded-2xl border bg-white p-6 shadow-sm"
                        >

                            <div className="flex items-start justify-between">

                                <div className="flex gap-4">

                                    <div className="rounded-xl bg-blue-50 p-3">

                                        <Icon
                                            size={24}
                                            className="text-blue-600"
                                        />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold">

                                            {cache.title}

                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">

                                            {cache.description}

                                        </p>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    disabled={clearing}
                                    onClick={cache.action}
                                    className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                                >

                                    {clearing ? (

                                        <LoaderCircle
                                            size={16}
                                            className="animate-spin"
                                        />

                                    ) : (

                                        <Trash2 size={16} />

                                    )}

                                    Clear

                                </button>

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* Clear All */}

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h3 className="text-lg font-semibold text-red-700">

                            Clear All Caches

                        </h3>

                        <p className="mt-2 text-sm text-red-600">

                            This will clear application, template,
                            static, and session caches. Users may
                            experience slightly slower loading until
                            caches are rebuilt.

                        </p>

                    </div>

                    <button
                        type="button"
                        disabled={clearing}
                        onClick={onClearAll}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                    >

                        {clearing ? (

                            <LoaderCircle
                                size={18}
                                className="animate-spin"
                            />

                        ) : (

                            <Trash2 size={18} />

                        )}

                        Clear All

                    </button>

                </div>

            </div>

        </div>

    );

};

CacheCard.propTypes = {

    stats: PropTypes.shape({

        total_size: PropTypes.string,

        total_items: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),

        last_cleared: PropTypes.string,

        driver: PropTypes.string,

    }),

    loading: PropTypes.bool,

    clearing: PropTypes.bool,

    onRefresh: PropTypes.func.isRequired,

    onClearApplication: PropTypes.func.isRequired,

    onClearTemplate: PropTypes.func.isRequired,

    onClearStatic: PropTypes.func.isRequired,

    onClearSession: PropTypes.func.isRequired,

    onClearAll: PropTypes.func.isRequired,

};

CacheCard.defaultProps = {

    stats: {

        total_size: "0 MB",

        total_items: 0,

        last_cleared: "Never",

        driver: "Unknown",

    },

    loading: false,

    clearing: false,

};

export default CacheCard;