import PropTypes from "prop-types";

const TwitterCardForm = ({
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

                    Twitter Card Settings

                </h2>

                <p className="mt-2 text-gray-500">

                    Configure how this page appears when shared on X (Twitter).

                </p>

            </div>

            {/* ==========================================
                Card Type
            ========================================== */}

            <div>

                <label
                    htmlFor="twitter_card"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Twitter Card Type

                </label>

                <select
                    id="twitter_card"
                    value={values.twitter_card || "summary_large_image"}
                    onChange={(event) =>
                        onChange(
                            "twitter_card",
                            event.target.value
                        )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >

                    <option value="summary">

                        Summary

                    </option>

                    <option value="summary_large_image">

                        Summary Large Image

                    </option>

                </select>

                {errors.twitter_card && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.twitter_card}

                    </p>

                )}

            </div>

            {/* ==========================================
                Twitter Title
            ========================================== */}

            <div>

                <div className="mb-2 flex items-center justify-between">

                    <label
                        htmlFor="twitter_title"
                        className="text-sm font-medium text-gray-700"
                    >

                        Twitter Title

                    </label>

                    <span
                        className={`text-xs ${
                            (values.twitter_title?.length || 0) > 70
                                ? "text-red-600"
                                : "text-gray-500"
                        }`}
                    >

                        {values.twitter_title?.length || 0}/70

                    </span>

                </div>

                <input
                    id="twitter_title"
                    type="text"
                    value={values.twitter_title || ""}
                    onChange={(event) =>
                        onChange(
                            "twitter_title",
                            event.target.value
                        )
                    }
                    placeholder="Enter Twitter title"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.twitter_title && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.twitter_title}

                    </p>

                )}

            </div>

            {/* ==========================================
                Twitter Description
            ========================================== */}

            <div>

                <div className="mb-2 flex items-center justify-between">

                    <label
                        htmlFor="twitter_description"
                        className="text-sm font-medium text-gray-700"
                    >

                        Twitter Description

                    </label>

                    <span
                        className={`text-xs ${
                            (values.twitter_description?.length || 0) > 200
                                ? "text-red-600"
                                : "text-gray-500"
                        }`}
                    >

                        {values.twitter_description?.length || 0}/200

                    </span>

                </div>

                <textarea
                    id="twitter_description"
                    rows={4}
                    value={values.twitter_description || ""}
                    onChange={(event) =>
                        onChange(
                            "twitter_description",
                            event.target.value
                        )
                    }
                    placeholder="Write a Twitter description..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.twitter_description && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.twitter_description}

                    </p>

                )}

            </div>

            {/* Continue in Message 2 */}

                        {/* ==========================================
                Twitter Image
            ========================================== */}

            <div>

                <label
                    htmlFor="twitter_image"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Twitter Card Image

                </label>

                <input
                    id="twitter_image"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        onChange(
                            "twitter_image",
                            event.target.files?.[0] || null
                        )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
                />

                {errors.twitter_image && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.twitter_image}

                    </p>

                )}

                {values.twitter_image_preview && (

                    <div className="mt-4">

                        <img
                            src={values.twitter_image_preview}
                            alt="Twitter Card Preview"
                            className="h-48 w-full rounded-xl border border-gray-200 object-cover"
                        />

                    </div>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Recommended image size: 1200 × 675 pixels.

                </p>

            </div>

            {/* ==========================================
                Twitter Creator
            ========================================== */}

            <div>

                <label
                    htmlFor="twitter_creator"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Twitter Creator

                </label>

                <input
                    id="twitter_creator"
                    type="text"
                    value={values.twitter_creator || ""}
                    onChange={(event) =>
                        onChange(
                            "twitter_creator",
                            event.target.value
                        )
                    }
                    placeholder="@username"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.twitter_creator && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.twitter_creator}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    The Twitter/X account responsible for this content.

                </p>

            </div>

            {/* ==========================================
                Twitter Site
            ========================================== */}

            <div>

                <label
                    htmlFor="twitter_site"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Twitter Site

                </label>

                <input
                    id="twitter_site"
                    type="text"
                    value={values.twitter_site || ""}
                    onChange={(event) =>
                        onChange(
                            "twitter_site",
                            event.target.value
                        )
                    }
                    placeholder="@yourcompany"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                {errors.twitter_site && (

                    <p className="mt-2 text-sm text-red-600">

                        {errors.twitter_site}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    The official Twitter/X account for your website or brand.

                </p>

            </div>

            {/* ==========================================
                Preview Information
            ========================================== */}

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

                <h3 className="text-sm font-semibold text-blue-900">

                    Twitter Card Tips

                </h3>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-blue-800">

                    <li>

                        Use a high-quality landscape image.

                    </li>

                    <li>

                        Keep the title concise and descriptive.

                    </li>

                    <li>

                        Use your official Twitter/X account.

                    </li>

                    <li>

                        Summary Large Image cards generally provide better engagement.

                    </li>

                </ul>

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

TwitterCardForm.propTypes = {

    values: PropTypes.shape({

        twitter_card: PropTypes.string,

        twitter_title: PropTypes.string,

        twitter_description: PropTypes.string,

        twitter_creator: PropTypes.string,

        twitter_site: PropTypes.string,

        twitter_image: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
        ]),

        twitter_image_preview: PropTypes.string,

    }).isRequired,

    errors: PropTypes.shape({

        twitter_card: PropTypes.string,

        twitter_title: PropTypes.string,

        twitter_description: PropTypes.string,

        twitter_creator: PropTypes.string,

        twitter_site: PropTypes.string,

        twitter_image: PropTypes.string,

    }),

    onChange: PropTypes.func.isRequired,

};

TwitterCardForm.defaultProps = {

    errors: {},

};

export default TwitterCardForm;