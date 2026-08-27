import PropTypes from "prop-types";

const RobotsEditor = ({
    value = "",
    error = "",
    onChange,
    onSave,
    onReset,
}) => {

    return (

        <div className="rounded-2xl border border-gray-200 bg-white">

            {/* ==========================================
                Header
            ========================================== */}

            <div className="border-b border-gray-200 p-6">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-900">

                            Robots.txt Editor

                        </h2>

                        <p className="mt-2 text-gray-500">

                            Manage the robots.txt file that controls how search engines crawl your website.

                        </p>

                    </div>

                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={onReset}
                            className="rounded-xl border border-gray-300 px-5 py-3 text-gray-700 transition hover:bg-gray-100"
                        >

                            Reset

                        </button>

                        <button
                            type="button"
                            onClick={onSave}
                            className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                        >

                            Save Changes

                        </button>

                    </div>

                </div>

            </div>

            {/* ==========================================
                Editor
            ========================================== */}

            <div className="p-6">

                <label
                    htmlFor="robots-editor"
                    className="mb-3 block text-sm font-medium text-gray-700"
                >

                    robots.txt

                </label>

                <textarea
                    id="robots-editor"
                    rows={18}
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    spellCheck={false}
                    className={`w-full rounded-xl border bg-gray-900 p-5 font-mono text-sm text-green-400 focus:outline-none ${
                        error
                            ? "border-red-500"
                            : "border-gray-700"
                    }`}
                    placeholder={`User-agent: *

Allow: /

Sitemap: https://example.com/sitemap.xml`}
                />

                {error && (

                    <p className="mt-3 text-sm text-red-600">

                        {error}

                    </p>

                )}

            </div>

            {/* ==========================================
                Live Preview
            ========================================== */}

            <div className="border-t border-gray-200 bg-gray-50 p-6">

                <h3 className="text-lg font-semibold text-gray-900">

                    Preview

                </h3>

                <pre className="mt-4 overflow-x-auto rounded-xl bg-black p-5 text-sm text-green-400">

{value || "robots.txt is empty."}

                </pre>

            </div>

            {/* Continue in Message 2 */}

                        {/* ==========================================
                Common Templates
            ========================================== */}

            <div className="border-t border-gray-200 p-6">

                <h3 className="text-lg font-semibold text-gray-900">

                    Common robots.txt Templates

                </h3>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">

                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                        <h4 className="font-semibold text-gray-900">

                            Public Website

                        </h4>

                        <pre className="mt-4 overflow-x-auto rounded-lg bg-black p-4 text-sm text-green-400">

{`User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml`}
                        </pre>

                    </div>

                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                        <h4 className="font-semibold text-gray-900">

                            Block Entire Website

                        </h4>

                        <pre className="mt-4 overflow-x-auto rounded-lg bg-black p-4 text-sm text-green-400">

{`User-agent: *
Disallow: /`}
                        </pre>

                    </div>

                </div>

            </div>

            {/* ==========================================
                Best Practices
            ========================================== */}

            <div className="border-t border-gray-200 bg-blue-50 p-6">

                <h3 className="text-lg font-semibold text-blue-900">

                    Best Practices

                </h3>

                <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-6 text-blue-800">

                    <li>

                        Include the sitemap URL whenever possible.

                    </li>

                    <li>

                        Avoid blocking important pages needed for indexing.

                    </li>

                    <li>

                        Test your robots.txt file before deploying changes.

                    </li>

                    <li>

                        Remember that robots.txt controls crawling, not indexing.

                    </li>

                    <li>

                        Use <strong>Noindex</strong> meta tags for pages that
                        should remain accessible but should not appear in search
                        results.

                    </li>

                </ul>

            </div>

            {/* ==========================================
                Common Directives
            ========================================== */}

            <div className="border-t border-gray-200 p-6">

                <h3 className="text-lg font-semibold text-gray-900">

                    Common Directives

                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                    <div className="rounded-lg border border-gray-200 p-4">

                        <h4 className="font-semibold text-gray-900">

                            User-agent

                        </h4>

                        <p className="mt-2 text-sm text-gray-600">

                            Specifies which crawler the rule applies to.

                        </p>

                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">

                        <h4 className="font-semibold text-gray-900">

                            Allow

                        </h4>

                        <p className="mt-2 text-sm text-gray-600">

                            Explicitly allows crawlers to access a path.

                        </p>

                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">

                        <h4 className="font-semibold text-gray-900">

                            Disallow

                        </h4>

                        <p className="mt-2 text-sm text-gray-600">

                            Prevents crawlers from accessing a path.

                        </p>

                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">

                        <h4 className="font-semibold text-gray-900">

                            Sitemap

                        </h4>

                        <p className="mt-2 text-sm text-gray-600">

                            Points search engines to your XML sitemap.

                        </p>

                    </div>

                </div>

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

RobotsEditor.propTypes = {

    value: PropTypes.string,

    error: PropTypes.string,

    onChange: PropTypes.func,

    onSave: PropTypes.func,

    onReset: PropTypes.func,

};

RobotsEditor.defaultProps = {

    value: "",

    error: "",

    onChange: () => {},

    onSave: () => {},

    onReset: () => {},

};

export default RobotsEditor;