import { useState } from "react";

import SitemapTable from "../components/SitemapTable";

const SitemapManagement = () => {

    const [pages, setPages] = useState([
        {
            id: 1,
            url: "/",
            lastModified: "2026-08-01",
            priority: "1.0",
            changeFrequency: "daily",
            enabled: true,
        },
        {
            id: 2,
            url: "/about",
            lastModified: "2026-07-28",
            priority: "0.8",
            changeFrequency: "monthly",
            enabled: true,
        },
        {
            id: 3,
            url: "/contact",
            lastModified: "2026-07-20",
            priority: "0.6",
            changeFrequency: "yearly",
            enabled: false,
        },
    ]);

    const handleToggle = (page) => {

        setPages((previous) =>
            previous.map((item) =>
                item.id === page.id
                    ? {
                        ...item,
                        enabled: !item.enabled,
                    }
                    : item
            )
        );

    };

    const handleEdit = (page) => {

        console.log("Edit sitemap page:", page);

        // Future:
        // Open edit modal

    };

    const handleRegenerate = () => {

        console.log("Regenerate sitemap");

        // Future:
        // Call backend API

    };

    return (

        <div className="space-y-8">
                        {/* ==========================================
                Page Header
            ========================================== */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        Sitemap Management

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Manage XML sitemap entries and control which pages are
                        submitted to search engines.

                    </p>

                </div>

                <div className="flex flex-wrap gap-3">

                    <button
                        type="button"
                        onClick={handleRegenerate}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                    >

                        Regenerate Sitemap

                    </button>

                    <button
                        type="button"
                        className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                    >

                        Export Sitemap

                    </button>

                </div>

            </div>

            {/* ==========================================
                Statistics
            ========================================== */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Total Pages

                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900">

                        {pages.length}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Included

                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-green-600">

                        {pages.filter(page => page.enabled).length}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Excluded

                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-red-600">

                        {pages.filter(page => !page.enabled).length}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Last Generated

                    </p>

                    <h2 className="mt-3 text-lg font-semibold text-gray-900">

                        Today

                    </h2>

                </div>

            </div>

            {/* ==========================================
                Sitemap Table
            ========================================== */}

            <SitemapTable

                pages={pages}

                onToggle={handleToggle}

                onEdit={handleEdit}

                onRegenerate={handleRegenerate}

            />

            {/* Continue in Message 3 */}
                    </div>

    );

};

export default SitemapManagement;