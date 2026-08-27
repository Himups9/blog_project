import PropTypes from "prop-types";

const RobotsMetaSelector = ({
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

                    Robots Meta Settings

                </h2>

                <p className="mt-2 text-gray-500">

                    Control how search engines crawl, index, and display this page.

                </p>

            </div>

            {/* ==========================================
                Indexing
            ========================================== */}

            <div className="grid gap-6 md:grid-cols-2">

                <div>

                    <label
                        htmlFor="robots_index"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >

                        Indexing

                    </label>

                    <select
                        id="robots_index"
                        value={values.robots_index || "index"}
                        onChange={(event) =>
                            onChange(
                                "robots_index",
                                event.target.value
                            )
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                    >

                        <option value="index">

                            Index

                        </option>

                        <option value="noindex">

                            No Index

                        </option>

                    </select>

                    {errors.robots_index && (

                        <p className="mt-2 text-sm text-red-600">

                            {errors.robots_index}

                        </p>

                    )}

                </div>

                <div>

                    <label
                        htmlFor="robots_follow"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >

                        Link Following

                    </label>

                    <select
                        id="robots_follow"
                        value={values.robots_follow || "follow"}
                        onChange={(event) =>
                            onChange(
                                "robots_follow",
                                event.target.value
                            )
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                    >

                        <option value="follow">

                            Follow

                        </option>

                        <option value="nofollow">

                            No Follow

                        </option>

                    </select>

                    {errors.robots_follow && (

                        <p className="mt-2 text-sm text-red-600">

                            {errors.robots_follow}

                        </p>

                    )}

                </div>

            </div>

            {/* ==========================================
                Advanced Directives
            ========================================== */}

            <div>

                <h3 className="mb-4 text-lg font-semibold text-gray-900">

                    Advanced Directives

                </h3>

                <div className="grid gap-4 md:grid-cols-2">

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked={values.noarchive || false}
                            onChange={(event) =>
                                onChange(
                                    "noarchive",
                                    event.target.checked
                                )
                            }
                            className="h-4 w-4 rounded border-gray-300"
                        />

                        <span className="text-gray-700">

                            No Archive

                        </span>

                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked={values.nosnippet || false}
                            onChange={(event) =>
                                onChange(
                                    "nosnippet",
                                    event.target.checked
                                )
                            }
                            className="h-4 w-4 rounded border-gray-300"
                        />

                        <span className="text-gray-700">

                            No Snippet

                        </span>

                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked={values.noimageindex || false}
                            onChange={(event) =>
                                onChange(
                                    "noimageindex",
                                    event.target.checked
                                )
                            }
                            className="h-4 w-4 rounded border-gray-300"
                        />

                        <span className="text-gray-700">

                            No Image Index

                        </span>

                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked={values.notranslate || false}
                            onChange={(event) =>
                                onChange(
                                    "notranslate",
                                    event.target.checked
                                )
                            }
                            className="h-4 w-4 rounded border-gray-300"
                        />

                        <span className="text-gray-700">

                            No Translate

                        </span>

                    </label>

                </div>

            </div>

            {/* Continue in Message 2 */}

                        {/* ==========================================
                Crawl Preview Limits
            ========================================== */}

            <div>

                <h3 className="mb-4 text-lg font-semibold text-gray-900">

                    Preview Limits

                </h3>

                <div className="grid gap-6 md:grid-cols-3">

                    {/* Max Snippet */}

                    <div>

                        <label
                            htmlFor="max_snippet"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >

                            Max Snippet

                        </label>

                        <input
                            id="max_snippet"
                            type="number"
                            min="-1"
                            value={values.max_snippet ?? -1}
                            onChange={(event) =>
                                onChange(
                                    "max_snippet",
                                    Number(event.target.value)
                                )
                            }
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />

                        <p className="mt-2 text-xs text-gray-500">

                            -1 allows Google to decide.

                        </p>

                    </div>

                    {/* Max Image Preview */}

                    <div>

                        <label
                            htmlFor="max_image_preview"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >

                            Max Image Preview

                        </label>

                        <select
                            id="max_image_preview"
                            value={values.max_image_preview || "large"}
                            onChange={(event) =>
                                onChange(
                                    "max_image_preview",
                                    event.target.value
                                )
                            }
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        >

                            <option value="none">

                                None

                            </option>

                            <option value="standard">

                                Standard

                            </option>

                            <option value="large">

                                Large

                            </option>

                        </select>

                    </div>

                    {/* Max Video Preview */}

                    <div>

                        <label
                            htmlFor="max_video_preview"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >

                            Max Video Preview

                        </label>

                        <input
                            id="max_video_preview"
                            type="number"
                            min="-1"
                            value={values.max_video_preview ?? -1}
                            onChange={(event) =>
                                onChange(
                                    "max_video_preview",
                                    Number(event.target.value)
                                )
                            }
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />

                        <p className="mt-2 text-xs text-gray-500">

                            -1 allows unlimited preview.

                        </p>

                    </div>

                </div>

            </div>

            {/* ==========================================
                Robots Meta Preview
            ========================================== */}

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                <h3 className="text-lg font-semibold text-gray-900">

                    Generated Robots Meta Tag

                </h3>

                <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">

{`<meta
  name="robots"
  content="${values.robots_index || "index"},
${values.robots_follow || "follow"}${
values.noarchive ? ", noarchive" : ""
}${
values.nosnippet ? ", nosnippet" : ""
}${
values.noimageindex ? ", noimageindex" : ""
}${
values.notranslate ? ", notranslate" : ""
},
max-snippet:${values.max_snippet ?? -1},
max-image-preview:${values.max_image_preview || "large"},
max-video-preview:${values.max_video_preview ?? -1}"
/>`}

                </pre>

            </div>

            {/* Continue in Message 3 */}

                    </div>

    );

};

RobotsMetaSelector.propTypes = {

    values: PropTypes.shape({

        robots_index: PropTypes.string,

        robots_follow: PropTypes.string,

        noarchive: PropTypes.bool,

        nosnippet: PropTypes.bool,

        noimageindex: PropTypes.bool,

        notranslate: PropTypes.bool,

        max_snippet: PropTypes.number,

        max_image_preview: PropTypes.string,

        max_video_preview: PropTypes.number,

    }).isRequired,

    errors: PropTypes.shape({

        robots_index: PropTypes.string,

        robots_follow: PropTypes.string,

    }),

    onChange: PropTypes.func.isRequired,

};

RobotsMetaSelector.defaultProps = {

    errors: {},

};

export default RobotsMetaSelector;