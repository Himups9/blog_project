import { useMemo, useState } from "react";

const SEOAnalytics = () => {

    const [dateRange, setDateRange] = useState("30");

    const analytics = useMemo(
        () => ({
            seoScore: 91,
            indexedPages: 324,
            impressions: 128540,
            clicks: 14326,
            averagePosition: 8.2,
            ctr: 11.14,
        }),
        []
    );

    const keywordPerformance = useMemo(
        () => [
            {
                id: 1,
                keyword: "react cms",
                clicks: 1420,
                impressions: 19200,
                position: 3.1,
                ctr: 7.4,
            },
            {
                id: 2,
                keyword: "django blog",
                clicks: 1184,
                impressions: 15820,
                position: 5.6,
                ctr: 7.5,
            },
            {
                id: 3,
                keyword: "tailwind admin",
                clicks: 854,
                impressions: 11042,
                position: 6.4,
                ctr: 7.7,
            },
            {
                id: 4,
                keyword: "news portal",
                clicks: 620,
                impressions: 9021,
                position: 9.8,
                ctr: 6.9,
            },
        ],
        []
    );

    const pagePerformance = useMemo(
        () => [
            {
                id: 1,
                page: "/",
                score: 98,
                indexed: true,
                clicks: 4260,
            },
            {
                id: 2,
                page: "/blog/react-guide",
                score: 94,
                indexed: true,
                clicks: 1810,
            },
            {
                id: 3,
                page: "/about",
                score: 88,
                indexed: true,
                clicks: 642,
            },
            {
                id: 4,
                page: "/contact",
                score: 82,
                indexed: true,
                clicks: 351,
            },
        ],
        []
    );

    return (

        <div className="space-y-8">

            {/* ======================================
                Header
            ====================================== */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        SEO Analytics

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Monitor search performance, keyword rankings,
                        indexing status, and overall SEO health.

                    </p>

                </div>

                <select
                    value={dateRange}
                    onChange={(event) =>
                        setDateRange(event.target.value)
                    }
                    className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="7">
                        Last 7 Days
                    </option>

                    <option value="30">
                        Last 30 Days
                    </option>

                    <option value="90">
                        Last 90 Days
                    </option>

                    <option value="365">
                        Last Year
                    </option>

                </select>

            </div>

            {/* ======================================
                Statistics Cards
            ====================================== */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        SEO Score

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-green-600">

                        {analytics.seoScore}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Indexed Pages

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-blue-600">

                        {analytics.indexedPages}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Impressions

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-purple-600">

                        {analytics.impressions.toLocaleString()}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Clicks

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-indigo-600">

                        {analytics.clicks.toLocaleString()}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Average Position

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-orange-600">

                        {analytics.averagePosition}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        CTR

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-teal-600">

                        {analytics.ctr}%

                    </h2>

                </div>

            </div>

            {/* Continue in Message 2 */}

                        {/* ======================================
                Performance Overview
            ====================================== */}

            <div className="grid gap-8 xl:grid-cols-3">

                {/* Top Keywords */}

                <div className="rounded-2xl border border-gray-200 bg-white xl:col-span-2">

                    <div className="border-b border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900">

                            Top Performing Keywords

                        </h2>

                        <p className="mt-2 text-sm text-gray-500">

                            Keywords generating the most organic traffic.

                        </p>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">

                                        Keyword

                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">

                                        Clicks

                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">

                                        Impressions

                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">

                                        Position

                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">

                                        CTR

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {keywordPerformance.map((keyword) => (

                                    <tr
                                        key={keyword.id}
                                        className="border-t border-gray-200 hover:bg-gray-50"
                                    >

                                        <td className="px-6 py-4 font-medium text-gray-800">

                                            {keyword.keyword}

                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            {keyword.clicks.toLocaleString()}

                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            {keyword.impressions.toLocaleString()}

                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            {keyword.position}

                                        </td>

                                        <td className="px-6 py-4 text-center font-semibold text-green-600">

                                            {keyword.ctr}%

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Search Visibility */}

                <div className="rounded-2xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900">

                            Search Visibility

                        </h2>

                    </div>

                    <div className="space-y-6 p-6">

                        <div>

                            <div className="mb-2 flex justify-between">

                                <span className="text-sm text-gray-600">

                                    SEO Score

                                </span>

                                <span className="font-semibold">

                                    91%

                                </span>

                            </div>

                            <div className="h-3 rounded-full bg-gray-200">

                                <div
                                    className="h-3 rounded-full bg-green-500"
                                    style={{ width: "91%" }}
                                />

                            </div>

                        </div>

                        <div>

                            <div className="mb-2 flex justify-between">

                                <span className="text-sm text-gray-600">

                                    Index Coverage

                                </span>

                                <span className="font-semibold">

                                    96%

                                </span>

                            </div>

                            <div className="h-3 rounded-full bg-gray-200">

                                <div
                                    className="h-3 rounded-full bg-blue-500"
                                    style={{ width: "96%" }}
                                />

                            </div>

                        </div>

                        <div>

                            <div className="mb-2 flex justify-between">

                                <span className="text-sm text-gray-600">

                                    Content Optimization

                                </span>

                                <span className="font-semibold">

                                    88%

                                </span>

                            </div>

                            <div className="h-3 rounded-full bg-gray-200">

                                <div
                                    className="h-3 rounded-full bg-purple-500"
                                    style={{ width: "88%" }}
                                />

                            </div>

                        </div>

                        <div>

                            <div className="mb-2 flex justify-between">

                                <span className="text-sm text-gray-600">

                                    Technical SEO

                                </span>

                                <span className="font-semibold">

                                    94%

                                </span>

                            </div>

                            <div className="h-3 rounded-full bg-gray-200">

                                <div
                                    className="h-3 rounded-full bg-orange-500"
                                    style={{ width: "94%" }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ======================================
                Top Performing Pages
            ====================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white">

                <div className="border-b border-gray-200 p-6">

                    <h2 className="text-xl font-bold text-gray-900">

                        Top Performing Pages

                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="px-6 py-4 text-left">

                                    Page

                                </th>

                                <th className="px-6 py-4 text-center">

                                    SEO Score

                                </th>

                                <th className="px-6 py-4 text-center">

                                    Indexed

                                </th>

                                <th className="px-6 py-4 text-center">

                                    Clicks

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {pagePerformance.map((page) => (

                                <tr
                                    key={page.id}
                                    className="border-t border-gray-200"
                                >

                                    <td className="px-6 py-4 font-medium">

                                        {page.page}

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        {page.score}

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        {page.indexed ? "✅" : "❌"}

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        {page.clicks.toLocaleString()}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Continue in Message 3 */}
                        {/* ======================================
                Insights & Recommendations
            ====================================== */}

            <div className="grid gap-8 lg:grid-cols-2">

                {/* SEO Insights */}

                <div className="rounded-2xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900">

                            SEO Insights

                        </h2>

                    </div>

                    <div className="space-y-4 p-6">

                        <div className="rounded-xl border border-green-200 bg-green-50 p-4">

                            <h3 className="font-semibold text-green-700">

                                Excellent Performance

                            </h3>

                            <p className="mt-2 text-sm text-green-600">

                                Your overall SEO score is above 90. Most important
                                pages are indexed successfully.

                            </p>

                        </div>

                        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">

                            <h3 className="font-semibold text-yellow-700">

                                Opportunity

                            </h3>

                            <p className="mt-2 text-sm text-yellow-700">

                                Improve content optimization on medium-ranking
                                pages to increase organic traffic.

                            </p>

                        </div>

                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">

                            <h3 className="font-semibold text-blue-700">

                                Keyword Growth

                            </h3>

                            <p className="mt-2 text-sm text-blue-700">

                                Several keywords are ranking between positions
                                4–10. Small improvements may move them into the
                                top three search results.

                            </p>

                        </div>

                    </div>

                </div>

                {/* Recommended Actions */}

                <div className="rounded-2xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900">

                            Recommended Actions

                        </h2>

                    </div>

                    <div className="space-y-4 p-6">

                        <div className="flex items-start gap-3">

                            <div className="mt-1 h-3 w-3 rounded-full bg-red-500" />

                            <div>

                                <p className="font-medium text-gray-900">

                                    Improve Meta Descriptions

                                </p>

                                <p className="mt-1 text-sm text-gray-600">

                                    Expand short descriptions to improve
                                    click-through rate.

                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-3">

                            <div className="mt-1 h-3 w-3 rounded-full bg-yellow-500" />

                            <div>

                                <p className="font-medium text-gray-900">

                                    Add Internal Links

                                </p>

                                <p className="mt-1 text-sm text-gray-600">

                                    Link related articles to improve crawlability
                                    and page authority.

                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-3">

                            <div className="mt-1 h-3 w-3 rounded-full bg-green-500" />

                            <div>

                                <p className="font-medium text-gray-900">

                                    Optimize Images

                                </p>

                                <p className="mt-1 text-sm text-gray-600">

                                    Add descriptive ALT text and compress large
                                    images for better page performance.

                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-3">

                            <div className="mt-1 h-3 w-3 rounded-full bg-blue-500" />

                            <div>

                                <p className="font-medium text-gray-900">

                                    Review Low Ranking Pages

                                </p>

                                <p className="mt-1 text-sm text-gray-600">

                                    Update outdated content and improve keyword
                                    targeting.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ======================================
                Future Integrations
            ====================================== */}

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">

                <h2 className="text-xl font-bold text-blue-900">

                    Planned Integrations

                </h2>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-blue-800">

                    <li>Google Search Console</li>

                    <li>Google Analytics 4</li>

                    <li>Bing Webmaster Tools</li>

                    <li>Google PageSpeed Insights</li>

                    <li>Core Web Vitals</li>

                    <li>Real-time keyword tracking</li>

                    <li>Index coverage reports</li>

                    <li>Backlink monitoring</li>

                </ul>

            </div>

        </div>

    );

};

export default SEOAnalytics;