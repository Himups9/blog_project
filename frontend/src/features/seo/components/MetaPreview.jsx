import PropTypes from "prop-types";

const MetaPreview = ({
    seoTitle,
    metaDescription,
    slug,
    siteUrl = "https://yourdomain.com",
}) => {

    const title =
        seoTitle?.trim() ||
        "Example Page Title";

    const description =
        metaDescription?.trim() ||
        "Your meta description will appear here. Keep it concise, descriptive, and relevant to improve search visibility.";

    const pageUrl = `${siteUrl}/${slug || "example-page"}`;

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

            {/* ==========================================
                Header
            ========================================== */}

            <div className="mb-5">

                <h2 className="text-2xl font-bold text-gray-900">

                    Google Search Preview

                </h2>

                <p className="mt-2 text-gray-500">

                    Preview how this page may appear in Google search results.

                </p>

            </div>

            {/* ==========================================
                Search Result Card
            ========================================== */}

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                {/* URL */}

                <p className="truncate text-sm text-green-700">

                    {pageUrl}

                </p>

                {/* Title */}

                <h3 className="mt-2 cursor-pointer text-xl font-medium text-blue-700 hover:underline">

                    {title}

                </h3>

                {/* Description */}

                <p className="mt-3 text-sm leading-6 text-gray-700">

                    {description}

                </p>

            </div>

            {/* ==========================================
                Character Summary
            ========================================== */}

            <div className="mt-6 grid gap-4 md:grid-cols-2">

                <div className="rounded-xl border border-gray-200 p-4">

                    <p className="text-sm text-gray-500">

                        Title Length

                    </p>

                    <p
                        className={`mt-1 text-lg font-semibold ${
                            title.length > 60
                                ? "text-red-600"
                                : "text-green-600"
                        }`}
                    >

                        {title.length} / 60

                    </p>

                </div>

                <div className="rounded-xl border border-gray-200 p-4">

                    <p className="text-sm text-gray-500">

                        Description Length

                    </p>

                    <p
                        className={`mt-1 text-lg font-semibold ${
                            description.length > 160
                                ? "text-red-600"
                                : "text-green-600"
                        }`}
                    >

                        {description.length} / 160

                    </p>

                </div>

            </div>

            {/* Continue in Message 2 */}

                        {/* ==========================================
                SEO Recommendations
            ========================================== */}

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">

                <h3 className="text-lg font-semibold text-gray-900">

                    SEO Recommendations

                </h3>

                <div className="mt-4 space-y-3">

                    {/* SEO Title */}

                    <div className="flex items-start gap-3">

                        <span
                            className={`mt-1 h-3 w-3 rounded-full ${
                                title.length >= 50 &&
                                title.length <= 60
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                            }`}
                        />

                        <div>

                            <p className="font-medium text-gray-900">

                                SEO Title

                            </p>

                            <p className="text-sm text-gray-600">

                                {title.length >= 50 &&
                                title.length <= 60
                                    ? "Excellent title length."
                                    : "Aim for 50–60 characters."}

                            </p>

                        </div>

                    </div>

                    {/* Meta Description */}

                    <div className="flex items-start gap-3">

                        <span
                            className={`mt-1 h-3 w-3 rounded-full ${
                                description.length >= 140 &&
                                description.length <= 160
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                            }`}
                        />

                        <div>

                            <p className="font-medium text-gray-900">

                                Meta Description

                            </p>

                            <p className="text-sm text-gray-600">

                                {description.length >= 140 &&
                                description.length <= 160
                                    ? "Excellent description length."
                                    : "Aim for 140–160 characters."}

                            </p>

                        </div>

                    </div>

                    {/* URL */}

                    <div className="flex items-start gap-3">

                        <span
                            className={`mt-1 h-3 w-3 rounded-full ${
                                slug
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                            }`}
                        />

                        <div>

                            <p className="font-medium text-gray-900">

                                URL Slug

                            </p>

                            <p className="text-sm text-gray-600">

                                {slug
                                    ? "SEO-friendly URL detected."
                                    : "Add a short, descriptive slug."}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* ==========================================
                SEO Checklist
            ========================================== */}

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">

                <h3 className="text-lg font-semibold text-gray-900">

                    Optimization Checklist

                </h3>

                <ul className="mt-4 space-y-2 text-sm text-gray-700">

                    <li>

                        {title.length >= 50 &&
                        title.length <= 60
                            ? "✅"
                            : "⚠️"}{" "}
                        Keep the SEO title between 50–60 characters.

                    </li>

                    <li>

                        {description.length >= 140 &&
                        description.length <= 160
                            ? "✅"
                            : "⚠️"}{" "}
                        Keep the meta description between 140–160 characters.

                    </li>

                    <li>

                        {slug
                            ? "✅"
                            : "⚠️"}{" "}
                        Use a readable, keyword-rich URL slug.

                    </li>

                </ul>

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

MetaPreview.propTypes = {

    seoTitle: PropTypes.string,

    metaDescription: PropTypes.string,

    slug: PropTypes.string,

    siteUrl: PropTypes.string,

};

MetaPreview.defaultProps = {

    seoTitle: "",

    metaDescription: "",

    slug: "",

    siteUrl: "https://yourdomain.com",

};

export default MetaPreview;