import PropTypes from "prop-types";
import { useMemo } from "react";

const KeywordAnalyzer = ({
    focusKeyword = "",
    seoTitle = "",
    slug = "",
    metaDescription = "",
    heading = "",
    content = "",
    imageAltTexts = [],
    onKeywordChange,
}) => {

    const keyword = focusKeyword.trim().toLowerCase();

    const analysis = useMemo(() => {

        if (!keyword) {

            return {

                occurrences: 0,

                density: 0,

                inTitle: false,

                inSlug: false,

                inDescription: false,

                inHeading: false,

                inImages: false,

            };

        }

        const escapedKeyword = keyword.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(escapedKeyword, "gi");

        const matches = content.match(regex) || [];

        const totalWords =
            content.trim().split(/\s+/).filter(Boolean).length || 1;

        return {

            occurrences: matches.length,

            density:
                ((matches.length / totalWords) * 100).toFixed(2),

            inTitle: seoTitle
                .toLowerCase()
                .includes(keyword),

            inSlug: slug
                .toLowerCase()
                .includes(keyword),

            inDescription: metaDescription
                .toLowerCase()
                .includes(keyword),

            inHeading: heading
                .toLowerCase()
                .includes(keyword),

            inImages: imageAltTexts.some((text) =>
                text.toLowerCase().includes(keyword)
            ),

        };

    }, [
        keyword,
        seoTitle,
        slug,
        metaDescription,
        heading,
        content,
        imageAltTexts,
    ]);

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

            {/* ==========================================
                Header
            ========================================== */}

            <div>

                <h2 className="text-2xl font-bold text-gray-900">

                    Focus Keyword Analyzer

                </h2>

                <p className="mt-2 text-gray-500">

                    Analyze how well your focus keyword is optimized throughout this page.

                </p>

            </div>

            {/* ==========================================
                Focus Keyword
            ========================================== */}

            <div className="mt-6">

                <label
                    htmlFor="focus_keyword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Focus Keyword

                </label>

                <input
                    id="focus_keyword"
                    type="text"
                    value={focusKeyword}
                    onChange={(event) =>
                        onKeywordChange(event.target.value)
                    }
                    placeholder="Enter your primary keyword..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

            </div>

            {/* ==========================================
                Keyword Statistics
            ========================================== */}

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                    <p className="text-sm text-gray-500">

                        Occurrences

                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900">

                        {analysis.occurrences}

                    </p>

                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                    <p className="text-sm text-gray-500">

                        Density

                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900">

                        {analysis.density}%

                    </p>

                </div>

                {/* Continue in Message 2 */}
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                    <p className="text-sm text-gray-500">

                        SEO Elements

                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900">

                        {[
                            analysis.inTitle,
                            analysis.inSlug,
                            analysis.inDescription,
                            analysis.inHeading,
                            analysis.inImages,
                        ].filter(Boolean).length}/5

                    </p>

                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                    <p className="text-sm text-gray-500">

                        Optimization

                    </p>

                    <p className="mt-2 text-2xl font-bold text-blue-600">

                        {analysis.density >= 0.5 &&
                        analysis.density <= 2.5
                            ? "Good"
                            : "Needs Work"}

                    </p>

                </div>

            </div>

            {/* ==========================================
                Density Progress
            ========================================== */}

            <div className="mt-8">

                <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm font-medium text-gray-700">

                        Keyword Density

                    </span>

                    <span className="text-sm text-gray-500">

                        {analysis.density}%

                    </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                    <div
                        className={`h-full rounded-full transition-all duration-300 ${
                            analysis.density >= 0.5 &&
                            analysis.density <= 2.5
                                ? "bg-green-500"
                                : analysis.density > 2.5
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                        }`}
                        style={{
                            width: `${Math.min(
                                Number(analysis.density) * 20,
                                100
                            )}%`,
                        }}
                    />

                </div>

                <p className="mt-2 text-xs text-gray-500">

                    Recommended keyword density: 0.5%–2.5%

                </p>

            </div>

            {/* ==========================================
                Keyword Checklist
            ========================================== */}

            <div className="mt-8 rounded-xl border border-gray-200">

                <div className="border-b border-gray-200 px-5 py-4">

                    <h3 className="text-lg font-semibold text-gray-900">

                        Keyword Checklist

                    </h3>

                </div>

                <div className="space-y-3 p-5">

                    {[
                        {
                            label: "Keyword appears in SEO Title",
                            passed: analysis.inTitle,
                        },
                        {
                            label: "Keyword appears in URL Slug",
                            passed: analysis.inSlug,
                        },
                        {
                            label: "Keyword appears in Meta Description",
                            passed: analysis.inDescription,
                        },
                        {
                            label: "Keyword appears in H1 Heading",
                            passed: analysis.inHeading,
                        },
                        {
                            label: "Keyword appears in Image ALT Text",
                            passed: analysis.inImages,
                        },
                    ].map((item) => (

                        <div
                            key={item.label}
                            className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                        >

                            <span className="text-sm text-gray-700">

                                {item.label}

                            </span>

                            <span
                                className={`font-semibold ${
                                    item.passed
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >

                                {item.passed ? "✔ Pass" : "✘ Missing"}

                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {/* ==========================================
                Recommendation
            ========================================== */}

            <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">

                <h3 className="text-lg font-semibold text-blue-900">

                    Recommendation

                </h3>

                <p className="mt-3 text-sm leading-6 text-blue-800">

                    Use your focus keyword naturally throughout the content.
                    Include it in the SEO title, URL slug, meta description,
                    H1 heading, and image ALT text. Avoid excessive repetition,
                    as keyword stuffing can negatively impact SEO.

                </p>

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

KeywordAnalyzer.propTypes = {

    focusKeyword: PropTypes.string,

    seoTitle: PropTypes.string,

    slug: PropTypes.string,

    metaDescription: PropTypes.string,

    heading: PropTypes.string,

    content: PropTypes.string,

    imageAltTexts: PropTypes.arrayOf(
        PropTypes.string
    ),

    onKeywordChange: PropTypes.func,

};

KeywordAnalyzer.defaultProps = {

    focusKeyword: "",

    seoTitle: "",

    slug: "",

    metaDescription: "",

    heading: "",

    content: "",

    imageAltTexts: [],

    onKeywordChange: () => {},

};

export default KeywordAnalyzer;