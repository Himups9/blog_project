import PropTypes from "prop-types";
import {
    Activity,
    Search,
    Eye,
    User,
    Calendar,
    Globe,
} from "lucide-react";

const actionColors = {
    login: "bg-green-100 text-green-700",
    logout: "bg-gray-100 text-gray-700",
    settings: "bg-blue-100 text-blue-700",
    backup: "bg-purple-100 text-purple-700",
    restore: "bg-orange-100 text-orange-700",
    cache: "bg-cyan-100 text-cyan-700",
    maintenance: "bg-yellow-100 text-yellow-700",
    delete: "bg-red-100 text-red-700",
};

const statusColors = {
    success: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    pending: "bg-gray-100 text-gray-700",
};

const ActivityTable = ({
    activities,
    loading = false,
    search = "",
    onSearch,
    onView,
}) => {

    if (loading) {

        return (

            <div className="rounded-2xl border bg-white p-16 text-center">

                <Activity
                    size={42}
                    className="mx-auto mb-4 animate-pulse text-gray-400"
                />

                <p className="text-gray-500">

                    Loading activity logs...

                </p>

            </div>

        );

    }

    return (

        <div className="rounded-2xl border bg-white shadow-sm">

            {/* Header */}

            <div className="flex flex-col gap-4 border-b p-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h2 className="text-xl font-semibold">

                        Activity Logs

                    </h2>

                    <p className="text-sm text-gray-500">

                        Review administrator and system activities.

                    </p>

                </div>

                <div className="relative w-full lg:w-80">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        placeholder="Search activities..."
                        onChange={(event) =>
                            onSearch(event.target.value)
                        }
                        className="w-full rounded-xl border py-2 pl-10 pr-4"
                    />

                </div>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left">

                                User

                            </th>

                            <th className="px-6 py-4 text-left">

                                Action

                            </th>

                            <th className="px-6 py-4 text-left">

                                Status

                            </th>

                            <th className="px-6 py-4 text-left">

                                IP Address

                            </th>

                            <th className="px-6 py-4 text-left">

                                Date

                            </th>

                            <th className="px-6 py-4 text-right">

                                Details

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {activities.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="px-6 py-16 text-center text-gray-500"
                                >

                                    No activity records found.

                                </td>

                            </tr>

                        ) : (

                            activities.map((activity) => (

                                <tr
                                    key={activity.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="rounded-full bg-gray-100 p-2">

                                                <User
                                                    size={18}
                                                    className="text-gray-600"
                                                />

                                            </div>

                                            <div>

                                                <p className="font-medium">

                                                    {activity.user_name}

                                                </p>

                                                <p className="text-sm text-gray-500">

                                                    {activity.email}

                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={[
                                                "rounded-full px-3 py-1 text-xs font-medium",
                                                actionColors[
                                                    activity.action
                                                ] ||
                                                    "bg-gray-100 text-gray-700",
                                            ].join(" ")}
                                        >

                                            {activity.action}

                                        </span>

                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={[
                                                "rounded-full px-3 py-1 text-xs font-medium",
                                                statusColors[
                                                    activity.status
                                                ] ||
                                                    "bg-gray-100 text-gray-700",
                                            ].join(" ")}
                                        >

                                            {activity.status}

                                        </span>

                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2">

                                            <Globe
                                                size={16}
                                                className="text-gray-500"
                                            />

                                            {activity.ip_address}

                                        </div>

                                    </td>

                                    <td className="px-6 py-5 whitespace-nowrap">

                                        <div className="flex items-center gap-2">

                                            <Calendar
                                                size={16}
                                                className="text-gray-500"
                                            />

                                            {activity.created_at}

                                        </div>

                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex justify-end">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onView(activity)
                                                }
                                                className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                                                title="View Details"
                                            >

                                                <Eye size={18} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

ActivityTable.propTypes = {

    activities: PropTypes.arrayOf(

        PropTypes.shape({

            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]).isRequired,

            user_name: PropTypes.string.isRequired,

            email: PropTypes.string.isRequired,

            action: PropTypes.string.isRequired,

            status: PropTypes.string.isRequired,

            ip_address: PropTypes.string.isRequired,

            created_at: PropTypes.string.isRequired,

        })

    ),

    loading: PropTypes.bool,

    search: PropTypes.string,

    onSearch: PropTypes.func.isRequired,

    onView: PropTypes.func.isRequired,

};

ActivityTable.defaultProps = {

    activities: [],

    loading: false,

    search: "",

};

export default ActivityTable;