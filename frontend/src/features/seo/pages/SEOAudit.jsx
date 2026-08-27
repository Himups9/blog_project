import { useMemo, useState } from "react";

const SEOAudit = () => {

    const [filter, setFilter] = useState("all");

    const auditSummary = useMemo(
        () => ({
            score: 91,
            totalIssues: 14,
            critical: 2,
            warnings: 5,
            passed: 42,
        }),
        []
    );

    const auditItems = useMemo(
        () => [
            {
                id: 1,
                category: "Technical SEO",
                issue: "Missing canonical URL",
                severity: "Critical",
                status: "Open",
                recommendation:
                    "Add a canonical URL to avoid duplicate content.",
            },
            {
                id: 2,
                category: "Content",
                issue: "Meta description too short",
                severity: "Warning",
                status: "Open",
                recommendation:
                    "Increase the meta description to 150–160 characters.",
            },
            {
                id: 3,
                category: "Images",
                issue: "Image missing ALT text",
                severity: "Warning",
                status: "Open",
                recommendation:
                    "Provide descriptive ALT text for accessibility and SEO.",
            },
            {
                id: 4,
                category: "Performance",
                issue: "Large JavaScript bundle",
                severity: "Medium",
                status: "Open",
                recommendation:
                    "Reduce bundle size using code splitting.",
            },
            {
                id: 5,
                category: "Robots",
                issue: "robots.txt configured",
                severity: "Passed",
                status: "Resolved",
                recommendation:
                    "No action required.",
            },
        ],
        []
    );

    const filteredItems = useMemo(() => {

        if (filter === "all") {

            return auditItems;

        }

        return auditItems.filter(
            (item) =>
                item.severity.toLowerCase() ===
                filter.toLowerCase()
        );

    }, [auditItems, filter]);

    return (

        <div className="space-y-8">

            {/* ======================================
                Header
            ====================================== */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        SEO Audit

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Run a comprehensive audit of your website's
                        search engine optimization health.

                    </p>

                </div>

                <div className="flex flex-wrap gap-3">

                    <button
                        type="button"
                        className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                    >
                        Run Audit
                    </button>

                    <button
                        type="button"
                        className="rounded-xl border border-gray-300 bg-white px-5 py-3 transition hover:bg-gray-100"
                    >
                        Export Report
                    </button>

                </div>

            </div>

            {/* ======================================
                Summary Cards
            ====================================== */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        SEO Score

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-green-600">

                        {auditSummary.score}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Total Issues

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-blue-600">

                        {auditSummary.totalIssues}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Critical

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-red-600">

                        {auditSummary.critical}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Warnings

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-yellow-600">

                        {auditSummary.warnings}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Passed

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-green-700">

                        {auditSummary.passed}

                    </h2>

                </div>

            </div>

            {/* Continue in Message 2 */}
                        {/* ======================================
                Filter
            ====================================== */}

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6">

                <div>

                    <h2 className="text-xl font-bold text-gray-900">

                        Audit Results

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Review detected SEO issues and recommendations.

                    </p>

                </div>

                <select
                    value={filter}
                    onChange={(event) =>
                        setFilter(event.target.value)
                    }
                    className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="all">

                        All Issues

                    </option>

                    <option value="critical">

                        Critical

                    </option>

                    <option value="warning">

                        Warning

                    </option>

                    <option value="medium">

                        Medium

                    </option>

                    <option value="passed">

                        Passed

                    </option>

                </select>

            </div>

            {/* ======================================
                Audit Results Table
            ====================================== */}

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">

                <table className="min-w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">

                                Category

                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">

                                Issue

                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">

                                Severity

                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">

                                Status

                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">

                                Recommendation

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredItems.map((item) => (

                            <tr
                                key={item.id}
                                className="border-t border-gray-200 hover:bg-gray-50"
                            >

                                <td className="px-6 py-4 font-medium text-gray-800">

                                    {item.category}

                                </td>

                                <td className="px-6 py-4">

                                    {item.issue}

                                </td>

                                <td className="px-6 py-4 text-center">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            item.severity === "Critical"
                                                ? "bg-red-100 text-red-700"
                                                : item.severity === "Warning"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : item.severity === "Medium"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-green-100 text-green-700"
                                        }`}
                                    >

                                        {item.severity}

                                    </span>

                                </td>

                                <td className="px-6 py-4 text-center">

                                    {item.status}

                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">

                                    {item.recommendation}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* ======================================
                SEO Checklists
            ====================================== */}

            <div className="grid gap-8 lg:grid-cols-2">

                {/* Technical SEO */}

                <div className="rounded-2xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900">

                            Technical SEO

                        </h2>

                    </div>

                    <div className="space-y-4 p-6">

                        <div className="flex items-center justify-between">

                            <span>HTTPS Enabled</span>

                            <span className="text-green-600">✅ Passed</span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span>Canonical URL</span>

                            <span className="text-red-600">❌ Missing</span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span>robots.txt</span>

                            <span className="text-green-600">✅ Passed</span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span>XML Sitemap</span>

                            <span className="text-green-600">✅ Passed</span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span>Broken Links</span>

                            <span className="text-yellow-600">⚠ Review</span>

                        </div>

                    </div>

                </div>

                {/* Content SEO */}

                <div className="rounded-2xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900">

                            Content SEO

                        </h2>

                    </div>

                    <div className="space-y-4 p-6">

                        <div className="flex items-center justify-between">

                            <span>Page Title</span>

                            <span className="text-green-600">✅ Passed</span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span>Meta Description</span>

                            <span className="text-yellow-600">⚠ Short</span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span>Heading Structure</span>

                            <span className="text-green-600">✅ Passed</span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span>Image ALT Text</span>

                            <span className="text-yellow-600">⚠ Missing</span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span>Keyword Density</span>

                            <span className="text-green-600">✅ Good</span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Continue in Message 3 */}
                        {/* ======================================
                Recommendations
            ====================================== */}

            <div className="grid gap-8 lg:grid-cols-2">

                {/* Recommended Actions */}

                <div className="rounded-2xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900">

                            Recommended Actions

                        </h2>

                    </div>

                    <div className="space-y-4 p-6">

                        <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                            <h3 className="font-semibold text-red-700">

                                High Priority

                            </h3>

                            <p className="mt-2 text-sm text-red-600">

                                Add canonical URLs to all indexable pages to
                                prevent duplicate content issues.

                            </p>

                        </div>

                        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">

                            <h3 className="font-semibold text-yellow-700">

                                Medium Priority

                            </h3>

                            <p className="mt-2 text-sm text-yellow-700">

                                Improve short meta descriptions to increase
                                search engine click-through rates.

                            </p>

                        </div>

                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">

                            <h3 className="font-semibold text-blue-700">

                                Optimization

                            </h3>

                            <p className="mt-2 text-sm text-blue-700">

                                Add ALT text to images and improve internal
                                linking between related content.

                            </p>

                        </div>

                    </div>

                </div>

                {/* Export & Future Integrations */}

                <div className="rounded-2xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900">

                            Reports & Integrations

                        </h2>

                    </div>

                    <div className="space-y-6 p-6">

                        <div>

                            <h3 className="font-semibold text-gray-900">

                                Export Audit

                            </h3>

                            <div className="mt-4 flex flex-wrap gap-3">

                                <button
                                    type="button"
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    PDF Report
                                </button>

                                <button
                                    type="button"
                                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                                >
                                    CSV Report
                                </button>

                                <button
                                    type="button"
                                    className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                                >
                                    JSON Report
                                </button>

                            </div>

                        </div>

                        <div>

                            <h3 className="font-semibold text-gray-900">

                                Planned Integrations

                            </h3>

                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">

                                <li>Google Search Console</li>
                                <li>Google Analytics 4</li>
                                <li>Google PageSpeed Insights</li>
                                <li>Google Lighthouse</li>
                                <li>Bing Webmaster Tools</li>
                                <li>Core Web Vitals</li>
                                <li>Schema.org Validator</li>
                                <li>Accessibility Scanner</li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default SEOAudit;