import PropTypes from "prop-types";

const SEOForm = ({
    values,
    errors = {},
    onChange,
}) => {

    return (

        <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6">

            {/* ==========================================
                Header
            ========================================== */}

            <div>

                <h2 className="text-2xl font-bold text-gray-900">

                    SEO Settings

                </h2>

                <p className="mt-2 text-gray-500">

                    Improve search engine visibility and social sharing.

                </p>

            </div>

            {/* ==========================================
                SEO Title
            ========================================== */}

            <div>

                <div className="mb-2 flex items-center justify-between">

                    <label
                        htmlFor="seo_title"
                        className="text-sm font-medium text-gray-700"
                    >

                        SEO Title

                    </label>

                    <span
                        className={`text-xs ${
                            (values.seo_title?.length || 0) > 60
                                ? "text-red-600"
                                : "text-gray-500"
                        }`}
                    >

                        {values.seo_title?.length || 0}/60

                    </span>

                </div>

                <input
                    id="seo_title"
                    type="text"
                    value={values.seo_title || ""}
                    onChange={(event) =>
                        onChange(
                            "seo_title",
                            event.target.value
                        )
                    }
                    placeholder="Enter SEO title"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.seo_title && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.seo_title}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Recommended length: 50–60 characters.

                </p>

            </div>

            {/* ==========================================
                Meta Description
            ========================================== */}

            <div>

                <div className="mb-2 flex items-center justify-between">

                    <label
                        htmlFor="meta_description"
                        className="text-sm font-medium text-gray-700"
                    >

                        Meta Description

                    </label>

                    <span
                        className={`text-xs ${
                            (values.meta_description?.length || 0) > 160
                                ? "text-red-600"
                                : "text-gray-500"
                        }`}
                    >

                        {values.meta_description?.length || 0}/160

                    </span>

                </div>

                <textarea
                    id="meta_description"
                    rows={4}
                    value={values.meta_description || ""}
                    onChange={(event) =>
                        onChange(
                            "meta_description",
                            event.target.value
                        )
                    }
                    placeholder="Write a concise meta description..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.meta_description && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.meta_description}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Recommended length: 150–160 characters.

                </p>

            </div>

            {/* Continue in Message 2 */}
                        {/* ==========================================
                Focus Keyword
            ========================================== */}

            <div>

                <label
                    htmlFor="focus_keyword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Focus Keyword

                </label>

                <input
                    id="focus_keyword"
                    type="text"
                    value={values.focus_keyword || ""}
                    onChange={(event) =>
                        onChange(
                            "focus_keyword",
                            event.target.value
                        )
                    }
                    placeholder="Example: React Blog CMS"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.focus_keyword && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.focus_keyword}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Choose one primary keyword that best describes this page.

                </p>

            </div>

            {/* ==========================================
                URL Slug
            ========================================== */}

            <div>

                <label
                    htmlFor="slug"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    URL Slug

                </label>

                <input
                    id="slug"
                    type="text"
                    value={values.slug || ""}
                    onChange={(event) =>
                        onChange(
                            "slug",
                            event.target.value
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                        )
                    }
                    placeholder="example-blog-post"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.slug && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.slug}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Use lowercase letters, numbers, and hyphens only.

                </p>

            </div>

            {/* ==========================================
                Canonical URL
            ========================================== */}

            <div>

                <label
                    htmlFor="canonical_url"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Canonical URL

                </label>

                <input
                    id="canonical_url"
                    type="url"
                    value={values.canonical_url || ""}
                    onChange={(event) =>
                        onChange(
                            "canonical_url",
                            event.target.value
                        )
                    }
                    placeholder="https://example.com/blog/my-post"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.canonical_url && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.canonical_url}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Leave empty unless this page has another preferred URL.

                </p>

            </div>

            {/* ==========================================
                Robots Meta
            ========================================== */}

            <div>

                <label
                    htmlFor="robots"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Robots Meta

                </label>

                <select
                    id="robots"
                    value={values.robots || "index,follow"}
                    onChange={(event) =>
                        onChange(
                            "robots",
                            event.target.value
                        )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="index,follow">
                        Index, Follow
                    </option>

                    <option value="noindex,follow">
                        No Index, Follow
                    </option>

                    <option value="index,nofollow">
                        Index, No Follow
                    </option>

                    <option value="noindex,nofollow">
                        No Index, No Follow
                    </option>

                </select>

                {errors.robots && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.robots}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Control whether search engines index this page and follow its links.

                </p>

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

SEOForm.propTypes = {

    values: PropTypes.shape({

        seo_title: PropTypes.string,

        meta_description: PropTypes.string,

        focus_keyword: PropTypes.string,

        slug: PropTypes.string,

        canonical_url: PropTypes.string,

        robots: PropTypes.string,

    }).isRequired,

    errors: PropTypes.shape({

        seo_title: PropTypes.string,

        meta_description: PropTypes.string,

        focus_keyword: PropTypes.string,

        slug: PropTypes.string,

        canonical_url: PropTypes.string,

        robots: PropTypes.string,

    }),

    onChange: PropTypes.func.isRequired,

};

SEOForm.defaultProps = {

    errors: {},

};

export default SEOForm;