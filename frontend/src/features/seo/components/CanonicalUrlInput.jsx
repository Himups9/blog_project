import PropTypes from "prop-types";

const CanonicalUrlInput = ({
    value = "",
    error = "",
    defaultUrl = "",
    onChange,
    onUseCurrentUrl,
    onClear,
}) => {

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

            {/* ==========================================
                Header
            ========================================== */}

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-900">

                    Canonical URL

                </h2>

                <p className="mt-2 text-gray-500">

                    Specify the preferred URL that search engines should index
                    to help prevent duplicate content issues.

                </p>

            </div>

            {/* ==========================================
                Canonical URL Input
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
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    placeholder="https://example.com/blog/my-post"
                    className={`w-full rounded-xl border px-4 py-3 transition-colors focus:outline-none ${
                        error
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                    }`}
                />

                {error && (

                    <p className="mt-2 text-sm text-red-600">

                        {error}

                    </p>

                )}

                <p className="mt-2 text-sm text-gray-500">

                    Leave this empty to use the page's own URL as the canonical URL.

                </p>

            </div>

            {/* ==========================================
                Current Canonical Preview
            ========================================== */}

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">

                <p className="text-sm font-medium text-gray-700">

                    Current Canonical URL

                </p>

                <p className="mt-2 break-all text-sm text-blue-700">

                    {value || defaultUrl || "Not set"}

                </p>

            </div>

            {/* Continue in Message 2 */}

                        {/* ==========================================
                Actions
            ========================================== */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                <button
                    type="button"
                    onClick={onUseCurrentUrl}
                    className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                >

                    Use Current URL

                </button>

                <button
                    type="button"
                    onClick={onClear}
                    className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >

                    Clear Canonical URL

                </button>

            </div>

            {/* ==========================================
                Information
            ========================================== */}

            <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">

                <h3 className="text-lg font-semibold text-blue-900">

                    Why use a Canonical URL?

                </h3>

                <p className="mt-3 text-sm leading-6 text-blue-800">

                    A canonical URL tells search engines which version of a page
                    should be treated as the primary version. This helps prevent
                    duplicate content from affecting search rankings.

                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-blue-800">

                    <li>

                        Use when identical content is available at multiple URLs.

                    </li>

                    <li>

                        Point to the preferred version of the page.

                    </li>

                    <li>

                        Use the full absolute URL including https://.

                    </li>

                    <li>

                        Most pages should use their own URL as the canonical URL.

                    </li>

                </ul>

            </div>

            {/* ==========================================
                Best Practices
            ========================================== */}

            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">

                <h3 className="text-lg font-semibold text-green-900">

                    Best Practices

                </h3>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-green-800">

                    <li>

                        Use HTTPS URLs whenever possible.

                    </li>

                    <li>

                        Avoid canonical chains.

                    </li>

                    <li>

                        Ensure the canonical URL returns HTTP 200.

                    </li>

                    <li>

                        Don't point unrelated pages to the same canonical URL.

                    </li>

                </ul>

            </div>

            {/* Continue in Message 3 */}

                    </div>

    );

};

CanonicalUrlInput.propTypes = {

    value: PropTypes.string,

    error: PropTypes.string,

    defaultUrl: PropTypes.string,

    onChange: PropTypes.func.isRequired,

    onUseCurrentUrl: PropTypes.func,

    onClear: PropTypes.func,

};

CanonicalUrlInput.defaultProps = {

    value: "",

    error: "",

    defaultUrl: "",

    onUseCurrentUrl: () => {},

    onClear: () => {},

};

export default CanonicalUrlInput;