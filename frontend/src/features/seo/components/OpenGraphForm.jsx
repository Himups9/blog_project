import PropTypes from "prop-types";

const OpenGraphForm = ({
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

                    Open Graph Settings

                </h2>

                <p className="mt-2 text-gray-500">

                    Configure how this page appears when shared on Facebook,
                    LinkedIn, WhatsApp, Discord, and other social platforms.

                </p>

            </div>

            {/* ==========================================
                Open Graph Title
            ========================================== */}

            <div>

                <div className="mb-2 flex items-center justify-between">

                    <label
                        htmlFor="og_title"
                        className="text-sm font-medium text-gray-700"
                    >

                        Open Graph Title

                    </label>

                    <span
                        className={`text-xs ${
                            (values.og_title?.length || 0) > 60
                                ? "text-red-600"
                                : "text-gray-500"
                        }`}
                    >

                        {values.og_title?.length || 0}/60

                    </span>

                </div>

                <input
                    id="og_title"
                    type="text"
                    value={values.og_title || ""}
                    onChange={(event) =>
                        onChange(
                            "og_title",
                            event.target.value
                        )
                    }
                    placeholder="Enter Open Graph title"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.og_title && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.og_title}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Recommended length: 50–60 characters.

                </p>

            </div>

            {/* ==========================================
                Open Graph Description
            ========================================== */}

            <div>

                <div className="mb-2 flex items-center justify-between">

                    <label
                        htmlFor="og_description"
                        className="text-sm font-medium text-gray-700"
                    >

                        Open Graph Description

                    </label>

                    <span
                        className={`text-xs ${
                            (values.og_description?.length || 0) > 160
                                ? "text-red-600"
                                : "text-gray-500"
                        }`}
                    >

                        {values.og_description?.length || 0}/160

                    </span>

                </div>

                <textarea
                    id="og_description"
                    rows={4}
                    value={values.og_description || ""}
                    onChange={(event) =>
                        onChange(
                            "og_description",
                            event.target.value
                        )
                    }
                    placeholder="Describe how this page should appear on social media..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.og_description && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.og_description}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Recommended length: 110–160 characters.

                </p>

            </div>

            {/* Continue in Message 2 */}
                        {/* ==========================================
                Open Graph Image
            ========================================== */}

            <div>

                <label
                    htmlFor="og_image"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Open Graph Image

                </label>

                <input
                    id="og_image"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        onChange(
                            "og_image",
                            event.target.files?.[0] || null
                        )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
                />

                {errors.og_image && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.og_image}

                    </p>

                )}

                {values.og_image_preview && (

                    <div className="mt-4">

                        <img
                            src={values.og_image_preview}
                            alt="Open Graph Preview"
                            className="h-48 w-full rounded-xl border border-gray-200 object-cover"
                        />

                    </div>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Recommended size: 1200 × 630 pixels.

                </p>

            </div>

            {/* ==========================================
                Open Graph URL
            ========================================== */}

            <div>

                <label
                    htmlFor="og_url"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Open Graph URL

                </label>

                <input
                    id="og_url"
                    type="url"
                    value={values.og_url || ""}
                    onChange={(event) =>
                        onChange(
                            "og_url",
                            event.target.value
                        )
                    }
                    placeholder="https://example.com/blog/my-post"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.og_url && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.og_url}

                    </p>

                )}

            </div>

            {/* ==========================================
                Open Graph Type
            ========================================== */}

            <div>

                <label
                    htmlFor="og_type"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Open Graph Type

                </label>

                <select
                    id="og_type"
                    value={values.og_type || "website"}
                    onChange={(event) =>
                        onChange(
                            "og_type",
                            event.target.value
                        )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="website">

                        Website

                    </option>

                    <option value="article">

                        Article

                    </option>

                    <option value="profile">

                        Profile

                    </option>

                </select>

                {errors.og_type && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.og_type}

                    </p>

                )}

            </div>

            {/* ==========================================
                Locale
            ========================================== */}

            <div>

                <label
                    htmlFor="og_locale"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Locale

                </label>

                <select
                    id="og_locale"
                    value={values.og_locale || "en_US"}
                    onChange={(event) =>
                        onChange(
                            "og_locale",
                            event.target.value
                        )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="en_US">

                        English (United States)

                    </option>

                    <option value="en_GB">

                        English (United Kingdom)

                    </option>

                    <option value="ne_NP">

                        Nepali (Nepal)

                    </option>

                </select>

                {errors.og_locale && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.og_locale}

                    </p>

                )}

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

OpenGraphForm.propTypes = {

    values: PropTypes.shape({

        og_title: PropTypes.string,

        og_description: PropTypes.string,

        og_url: PropTypes.string,

        og_type: PropTypes.string,

        og_locale: PropTypes.string,

        og_image: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
        ]),

        og_image_preview: PropTypes.string,

    }).isRequired,

    errors: PropTypes.shape({

        og_title: PropTypes.string,

        og_description: PropTypes.string,

        og_url: PropTypes.string,

        og_type: PropTypes.string,

        og_locale: PropTypes.string,

        og_image: PropTypes.string,

    }),

    onChange: PropTypes.func.isRequired,

};

OpenGraphForm.defaultProps = {

    errors: {},

};

export default OpenGraphForm;