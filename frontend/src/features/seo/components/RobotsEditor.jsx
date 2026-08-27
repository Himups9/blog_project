import { useState } from "react";

import RobotsEditor from "../components/RobotsEditor";

const DEFAULT_ROBOTS = `User-agent: *

Allow: /

Disallow: /admin/

Sitemap: https://example.com/sitemap.xml`;

const RobotsManagement = () => {

    const [robotsContent, setRobotsContent] =
        useState(DEFAULT_ROBOTS);

    const [error, setError] = useState("");

    const [lastUpdated] = useState("2026-08-01 10:30");

    const validateRobots = (content) => {

        if (!content.trim()) {

            return "robots.txt cannot be empty.";

        }

        if (!content.includes("User-agent")) {

            return "A User-agent directive is required.";

        }

        if (!content.includes("Sitemap")) {

            return "Consider adding a Sitemap directive.";

        }

        return "";

    };

    const handleSave = () => {

        const validationError =
            validateRobots(robotsContent);

        setError(validationError);

        if (validationError) {

            return;

        }

        console.log("Saving robots.txt...");

        // Future:
        // await seoService.saveRobotsTxt(robotsContent);

    };

    const handleReset = () => {

        setRobotsContent(DEFAULT_ROBOTS);

        setError("");

    };

    return (

        <div className="space-y-8">
                        {/* ==========================================
                Page Header
            ========================================== */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        Robots.txt Management

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Configure crawler rules and control how search engines
                        access your website.

                    </p>

                </div>

                <div className="flex flex-wrap gap-3">

                    <button
                        type="button"
                        onClick={handleReset}
                        className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                    >

                        Reset

                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                    >

                        Save robots.txt

                    </button>

                </div>

            </div>

            {/* ==========================================
                Status Cards
            ========================================== */}

            <div className="grid gap-6 md:grid-cols-3">

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        File Status

                    </p>

                    <h2 className="mt-3 text-xl font-bold text-green-600">

                        Valid

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Last Updated

                    </p>

                    <h2 className="mt-3 text-lg font-semibold text-gray-900">

                        {lastUpdated}

                    </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">

                        Sitemap

                    </p>

                    <h2 className="mt-3 text-lg font-semibold text-blue-600">

                        Configured

                    </h2>

                </div>

            </div>

            {/* ==========================================
                Robots Editor
            ========================================== */}

            <RobotsEditor

                value={robotsContent}

                error={error}

                onChange={(value) => {

                    setRobotsContent(value);

                    if (error) {

                        setError("");

                    }

                }}

                onSave={handleSave}

                onReset={handleReset}

            />

            {/* ==========================================
                Information
            ========================================== */}

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">

                <h2 className="text-lg font-semibold text-blue-900">

                    robots.txt Information

                </h2>

                <p className="mt-3 text-sm leading-6 text-blue-800">

                    The <strong>robots.txt</strong> file tells compliant search
                    engine crawlers which areas of your site they may crawl.
                    Changes should be tested carefully because incorrect rules
                    can unintentionally block important pages from being crawled.

                </p>

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

export default RobotsManagement;