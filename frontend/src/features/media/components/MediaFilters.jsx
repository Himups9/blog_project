import PropTypes from "prop-types";
import {
    Filter,
    Image,
    RefreshCw,
    Search,
} from "lucide-react";

const MediaFilters = ({
    filters,
    totalItems = 0,
    onSearchChange,
    onTypeChange,
    onSortChange,
    onReset,
}) => {

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">

            {/* ======================================
                Filters
            ====================================== */}

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
                        placeholder="Search media..."
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
                    />

                </div>


                {/* File Type */}

                <select
                    value={filters.type}
                    onChange={(e) =>
                        onTypeChange(e.target.value)
                    }
                    className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="">
                        All Types
                    </option>

                    <option value="image">
                        Images
                    </option>

                    <option value="video">
                        Videos
                    </option>

                    <option value="document">
                        Documents
                    </option>

                </select>


                {/* Sort */}

                <select
                    value={filters.sort}
                    onChange={(e) =>
                        onSortChange(e.target.value)
                    }
                    className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="newest">
                        Newest First
                    </option>

                    <option value="oldest">
                        Oldest First
                    </option>

                    <option value="name_asc">
                        Name (A-Z)
                    </option>

                    <option value="name_desc">
                        Name (Z-A)
                    </option>

                    <option value="size_desc">
                        Largest First
                    </option>

                    <option value="size_asc">
                        Smallest First
                    </option>

                </select>


                {/* Reset */}

                <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-medium transition hover:bg-gray-100"
                >

                    <RefreshCw size={18} />

                    Reset Filters

                </button>

            </div>


            {/* ======================================
                Footer
            ====================================== */}

            <div className="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-5 md:flex-row md:items-center md:justify-between">

                {/* Total Files */}

                <div className="flex items-center gap-2 text-gray-600">

                    <Image
                        size={18}
                        className="text-blue-600"
                    />

                    <span className="font-medium">

                        {totalItems} media
                        {totalItems !== 1 && " files"}

                    </span>

                </div>


                {/* Active Filters */}

                <div className="flex flex-wrap gap-2">

                    {/* Search Filter */}

                    {filters.search && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                            Search: {filters.search}
                        </span>
                    )}


                    {/* Type Filter */}

                    {filters.type && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                            Type: {filters.type}
                        </span>
                    )}


                    {/* Sort Filter */}

                    {filters.sort !== "newest" && (
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                            Sort: {filters.sort}
                        </span>
                    )}


                    {/* No Filters */}

                    {!filters.search &&
                        !filters.type &&
                        filters.sort === "newest" && (
                            <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">

                                <Filter size={14} />

                                No filters applied

                            </span>
                        )}

                </div>

            </div>

        </div>
    );
};


/* ======================================
   PropTypes
====================================== */

MediaFilters.propTypes = {

    filters: PropTypes.shape({

        search: PropTypes.string.isRequired,

        type: PropTypes.string.isRequired,

        sort: PropTypes.string.isRequired,

    }).isRequired,

    totalItems: PropTypes.number,

    onSearchChange: PropTypes.func.isRequired,

    onTypeChange: PropTypes.func.isRequired,

    onSortChange: PropTypes.func.isRequired,

    onReset: PropTypes.func.isRequired,

};


export default MediaFilters;