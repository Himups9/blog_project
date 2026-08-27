import PropTypes from "prop-types";
import { useMemo, useState } from "react";

const SitemapTable = ({
    pages = [],
    onToggle,
    onEdit,
    onRegenerate,
}) => {

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const filteredPages = useMemo(() => {

        return pages.filter((page) => {

            const matchesSearch =
                page.url
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "included"
                    ? page.enabled
                    : !page.enabled);

            return matchesSearch && matchesStatus;

        });

    }, [
        pages,
        search,
        statusFilter,
    ]);

    return (

        <div className="rounded-2xl border border-gray-200 bg-white">

            {/* ======================================
                Header
            ====================================== */}

            <div className="border-b border-gray-200 p-6">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-900">

                            Sitemap Management

                        </h2>

                        <p className="mt-2 text-gray-500">

                            Manage pages included in your XML sitemap.

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onRegenerate}
                        className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                    >

                        Regenerate Sitemap

                    </button>

                </div>

            </div>

            {/* ======================================
                Filters
            ====================================== */}

            <div className="grid gap-4 border-b border-gray-200 p-6 md:grid-cols-2">

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search URL..."
                    className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(
                            event.target.value
                        )
                    }
                    className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="all">

                        All Pages

                    </option>

                    <option value="included">

                        Included

                    </option>

                    <option value="excluded">

                        Excluded

                    </option>

                </select>

            </div>

            {/* Continue in Message 2 */}
                        {/* ======================================
                Sitemap Table
            ====================================== */}

            <div className="overflow-x-auto">

                {filteredPages.length === 0 ? (

                    <div className="p-10 text-center">

                        <h3 className="text-lg font-semibold text-gray-700">

                            No Pages Found

                        </h3>

                        <p className="mt-2 text-sm text-gray-500">

                            No sitemap entries match your current search or filter.

                        </p>

                    </div>

                ) : (

                    <table className="min-w-full">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">

                                    URL

                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">

                                    Last Modified

                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">

                                    Priority

                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">

                                    Change Frequency

                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">

                                    Status

                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredPages.map((page) => (

                                <tr
                                    key={page.id}
                                    className="border-t border-gray-200 hover:bg-gray-50"
                                >

                                    <td className="px-6 py-4">

                                        <div className="max-w-md">

                                            <p className="truncate font-medium text-blue-600">

                                                {page.url}

                                            </p>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">

                                        {page.lastModified}

                                    </td>

                                    <td className="px-6 py-4">

                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                                            {page.priority}

                                        </span>

                                    </td>

                                    <td className="px-6 py-4 capitalize text-gray-700">

                                        {page.changeFrequency}

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <label className="inline-flex cursor-pointer items-center">

                                            <input
                                                type="checkbox"
                                                checked={page.enabled}
                                                onChange={() =>
                                                    onToggle(page)
                                                }
                                                className="h-5 w-5 rounded border-gray-300"
                                            />

                                        </label>

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onEdit(page)
                                            }
                                            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                                        >

                                            Edit

                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

SitemapTable.propTypes = {

    pages: PropTypes.arrayOf(

        PropTypes.shape({

            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,

            url: PropTypes.string.isRequired,

            lastModified: PropTypes.string.isRequired,

            priority: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,

            changeFrequency: PropTypes.string.isRequired,

            enabled: PropTypes.bool.isRequired,

        })

    ),

    onToggle: PropTypes.func,

    onEdit: PropTypes.func,

    onRegenerate: PropTypes.func,

};

SitemapTable.defaultProps = {

    pages: [],

    onToggle: () => {},

    onEdit: () => {},

    onRegenerate: () => {},

};

export default SitemapTable;