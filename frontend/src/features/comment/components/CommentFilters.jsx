import PropTypes from "prop-types";
import {
    Filter,
    RotateCcw,
    Search,
} from "lucide-react";

const CommentFilters = ({
    filters,
    onSearchChange,
    onStatusChange,
    onOrderingChange,
    onReset,
}) => {

    return (

        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={filters.search}
                        placeholder="Search comments..."
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
                    />

                </div>

                {/* Status */}

                <select
                    value={filters.status}
                    onChange={(e) =>
                        onStatusChange(e.target.value)
                    }
                    className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="">
                        All Statuses
                    </option>

                    <option value="pending">
                        Pending
                    </option>

                    <option value="approved">
                        Approved
                    </option>

                    <option value="reported">
                        Reported
                    </option>

                    <option value="spam">
                        Spam
                    </option>

                    <option value="rejected">
                        Rejected
                    </option>

                </select>

                {/* Sort */}

                <select
                    value={filters.ordering}
                    onChange={(e) =>
                        onOrderingChange(e.target.value)
                    }
                    className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="-created_at">
                        Newest First
                    </option>

                    <option value="created_at">
                        Oldest First
                    </option>

                    <option value="-updated_at">
                        Recently Updated
                    </option>

                    <option value="updated_at">
                        Oldest Updated
                    </option>

                </select>

                {/* Reset */}

                <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 font-medium transition hover:bg-gray-200"
                >

                    <RotateCcw size={18} />

                    Reset Filters

                </button>

            </div>

            {/* Active Filters */}

            {(filters.search ||
                filters.status ||
                filters.ordering !== "-created_at") && (

                <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">

                    <Filter size={16} />

                    <span className="font-medium">
                        Active Filters:
                    </span>

                    {filters.search && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                            Search: {filters.search}
                        </span>
                    )}

                    {filters.status && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                            {filters.status}
                        </span>
                    )}

                </div>

            )}

        </div>

    );

};

CommentFilters.propTypes = {

    filters: PropTypes.shape({

        search: PropTypes.string,

        status: PropTypes.string,

        ordering: PropTypes.string,

    }).isRequired,

    onSearchChange: PropTypes.func.isRequired,

    onStatusChange: PropTypes.func.isRequired,

    onOrderingChange: PropTypes.func.isRequired,

    onReset: PropTypes.func.isRequired,

};

export default CommentFilters;