import { useState } from "react";

import SEOForm from "../components/SEOForm";
import MetaPreview from "../components/MetaPreview";
import OpenGraphForm from "../components/OpenGraphForm";
import TwitterCardForm from "../components/TwitterCardForm";
import CanonicalUrlInput from "../components/CanonicalUrlInput";
import RobotsMetaSelector from "../components/RobotsMetaSelector";
import SEOScoreCard from "../components/SEOScoreCard";
import SEOIssuesList from "../components/SEOIssuesList";
import KeywordAnalyzer from "../components/KeywordAnalyzer";

const SEOSettings = () => {

    const [seoData, setSeoData] = useState({

        title: "",

        slug: "",

        meta_description: "",

        canonical_url: "",

        focus_keyword: "",

        heading: "",

        content: "",

        image_alt_texts: [],

        open_graph: {

            title: "",

            description: "",

            image: "",

            type: "website",

        },

        twitter: {

            card: "summary_large_image",

            title: "",

            description: "",

            image: "",

        },

        robots: {

            robots_index: "index",

            robots_follow: "follow",

            noarchive: false,

            nosnippet: false,

            noimageindex: false,

            notranslate: false,

            max_snippet: -1,

            max_image_preview: "large",

            max_video_preview: -1,

        },

    });

    const [seoScore] = useState(82);

    const [seoIssues] = useState([
        {
            id: 1,
            title: "Focus keyword missing from H1",
            description: "The focus keyword does not appear in the primary heading.",
            category: "Content",
            priority: "high",
            recommendation: "Add the focus keyword naturally to the H1 heading.",
        },
        {
            id: 2,
            title: "Meta description is short",
            description: "The meta description is under the recommended length.",
            category: "Metadata",
            priority: "medium",
            recommendation: "Expand the meta description to approximately 150–160 characters.",
        },
    ]);

    const handleChange = (field, value) => {

        setSeoData((previous) => ({

            ...previous,

            [field]: value,

        }));

    };

    const handleRobotsChange = (field, value) => {

        setSeoData((previous) => ({

            ...previous,

            robots: {

                ...previous.robots,

                [field]: value,

            },

        }));

    };

    return (

        <div className="space-y-8">
                        {/* ==========================================
                Page Header
            ========================================== */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        SEO Settings

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Configure search engine optimization settings for this page.

                    </p>

                </div>

                <button
                    type="button"
                    className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                >

                    Save SEO Settings

                </button>

            </div>

            {/* ==========================================
                SEO Score
            ========================================== */}

            <SEOScoreCard

                score={seoScore}

                passedChecks={[
                    "SEO title exists",
                    "Canonical URL configured",
                    "Open Graph configured",
                    "Twitter Card configured",
                ]}

                warnings={[
                    "Meta description could be longer",
                ]}

                failedChecks={[
                    "Focus keyword missing from H1",
                ]}

            />

            {/* ==========================================
                Main Content
            ========================================== */}

            <div className="grid gap-8 xl:grid-cols-3">

                {/* Left Column */}

                <div className="space-y-8 xl:col-span-2">

                    <SEOForm

                        values={seoData}

                        onChange={handleChange}

                    />

                    <CanonicalUrlInput

                        value={seoData.canonical_url}

                        onChange={(value) =>
                            handleChange(
                                "canonical_url",
                                value
                            )
                        }

                    />

                    <RobotsMetaSelector

                        values={seoData.robots}

                        errors={{}}

                        onChange={handleRobotsChange}

                    />

                    <OpenGraphForm

                        values={seoData.open_graph}

                        onChange={(field, value) =>

                            setSeoData((previous) => ({

                                ...previous,

                                open_graph: {

                                    ...previous.open_graph,

                                    [field]: value,

                                },

                            }))

                        }

                    />

                    <TwitterCardForm

                        values={seoData.twitter}

                        onChange={(field, value) =>

                            setSeoData((previous) => ({

                                ...previous,

                                twitter: {

                                    ...previous.twitter,

                                    [field]: value,

                                },

                            }))

                        }

                    />

                </div>

                {/* Right Column */}

                <div className="space-y-8">

                    <MetaPreview

                        title={seoData.title}

                        slug={seoData.slug}

                        description={seoData.meta_description}

                    />

                    <KeywordAnalyzer

                        focusKeyword={seoData.focus_keyword}

                        seoTitle={seoData.title}

                        slug={seoData.slug}

                        metaDescription={seoData.meta_description}

                        heading={seoData.heading}

                        content={seoData.content}

                        imageAltTexts={seoData.image_alt_texts}

                        onKeywordChange={(value) =>
                            handleChange(
                                "focus_keyword",
                                value
                            )
                        }

                    />

                </div>

            </div>

            {/* Continue in Message 3 */}
                        {/* ==========================================
                SEO Issues
            ========================================== */}

            <SEOIssuesList

                issues={seoIssues}

                onFixIssue={(issue) => {

                    console.log("Fix issue:", issue);

                    // Future enhancement:
                    // Navigate to the corresponding section
                    // Example:
                    // issue.category === "Metadata"
                    // -> scroll to SEOForm

                }}

            />

        </div>

    );

};

export default SEOSettings;