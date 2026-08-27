import PropTypes from "prop-types";
import { useMemo, useState } from "react";

const SEOIssuesList = ({
    issues = [],
    onFixIssue,
}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const filteredIssues = useMemo(() => {

        return issues.filter((issue) => {

            const matchesSearch =
                issue.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                issue.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesPriority =
                priorityFilter === "all" ||
                issue.priority === priorityFilter;

            return matchesSearch && matchesPriority;

        });

    }, [issues, searchTerm, priorityFilter]);

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

            {/* ==========================================
                Header
            ========================================== */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-gray-900">

                        SEO Issues

                    </h2>

                    <p className="mt-2 text-gray-500">

                        Review and resolve SEO issues before publishing.

                    </p>

                </div>

                <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">

                    {filteredIssues.length} Issue(s)

                </div>

            </div>

            {/* ==========================================
                Filters
            ========================================== */}

            <div className="mt-6 grid gap-4 md:grid-cols-2">

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                    placeholder="Search issues..."
                    className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                <select
                    value={priorityFilter}
                    onChange={(event) =>
                        setPriorityFilter(event.target.value)
                    }
                    className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="all">

                        All Priorities

                    </option>

                    <option value="high">

                        High

                    </option>

                    <option value="medium">

                        Medium

                    </option>

                    <option value="low">

                        Low

                    </option>

                </select>

            </div>

            {/* Continue in Message 2 */}
                        {/* ==========================================
                Issues List
            ========================================== */}

            <div className="mt-8 space-y-4">

                {filteredIssues.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">

                        <h3 className="text-lg font-semibold text-gray-700">

                            No Issues Found

                        </h3>

                        <p className="mt-2 text-sm text-gray-500">

                            Great! Your page currently has no SEO issues matching the selected filters.

                        </p>

                    </div>

                ) : (

                    filteredIssues.map((issue) => {

                        const badgeClass =
                            issue.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : issue.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700";

                        const icon =
                            issue.priority === "high"
                                ? "❌"
                                : issue.priority === "medium"
                                    ? "⚠️"
                                    : "ℹ️";

                        return (

                            <details
                                key={issue.id}
                                className="rounded-xl border border-gray-200 bg-white"
                            >

                                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5">

                                    <div className="flex items-center gap-3">

                                        <span className="text-xl">

                                            {icon}

                                        </span>

                                        <div>

                                            <h3 className="font-semibold text-gray-900">

                                                {issue.title}

                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">

                                                {issue.category}

                                            </p>

                                        </div>

                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${badgeClass}`}
                                    >

                                        {issue.priority}

                                    </span>

                                </summary>

                                <div className="border-t border-gray-100 px-5 py-4">

                                    <p className="text-sm leading-6 text-gray-700">

                                        {issue.description}

                                    </p>

                                    {issue.recommendation && (

                                        <div className="mt-4 rounded-lg bg-blue-50 p-4">

                                            <p className="text-sm font-medium text-blue-900">

                                                Recommended Fix

                                            </p>

                                            <p className="mt-2 text-sm text-blue-800">

                                                {issue.recommendation}

                                            </p>

                                        </div>

                                    )}

                                    <div className="mt-5 flex justify-end">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onFixIssue(issue)
                                            }
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                        >

                                            Fix Now

                                        </button>

                                    </div>

                                </div>

                            </details>

                        );

                    })

                )}

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

SEOIssuesList.propTypes = {

    issues: PropTypes.arrayOf(

        PropTypes.shape({

            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,

            title: PropTypes.string.isRequired,

            description: PropTypes.string.isRequired,

            category: PropTypes.string,

            priority: PropTypes.oneOf([
                "high",
                "medium",
                "low",
            ]),

            recommendation: PropTypes.string,

        })

    ),

    onFixIssue: PropTypes.func,

};

SEOIssuesList.defaultProps = {

    issues: [],

    onFixIssue: () => {},

};

export default SEOIssuesList;