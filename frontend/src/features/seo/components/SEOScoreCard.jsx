import PropTypes from "prop-types";

const SEOScoreCard = ({
    score = 0,
    passedChecks = [],
    warnings = [],
    failedChecks = [],
}) => {

    const scoreColor =
        score >= 90
            ? "text-green-600"
            : score >= 70
                ? "text-yellow-600"
                : "text-red-600";

    const progressColor =
        score >= 90
            ? "bg-green-500"
            : score >= 70
                ? "bg-yellow-500"
                : "bg-red-500";

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

            {/* ==========================================
                Header
            ========================================== */}

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-gray-900">

                        SEO Score

                    </h2>

                    <p className="mt-2 text-gray-500">

                        Overall optimization score for this page.

                    </p>

                </div>

                <div
                    className={`text-4xl font-bold ${scoreColor}`}
                >

                    {score}

                </div>

            </div>

            {/* ==========================================
                Progress Bar
            ========================================== */}

            <div className="mt-8">

                <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                    <div
                        className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                        style={{
                            width: `${Math.min(score, 100)}%`,
                        }}
                    />

                </div>

                <div className="mt-2 flex justify-between text-sm text-gray-500">

                    <span>

                        Poor

                    </span>

                    <span>

                        Good

                    </span>

                    <span>

                        Excellent

                    </span>

                </div>

            </div>

            {/* ==========================================
                Score Summary
            ========================================== */}

            <div className="mt-8 grid gap-4 md:grid-cols-3">

                <div className="rounded-xl border border-green-200 bg-green-50 p-4">

                    <p className="text-sm text-green-700">

                        Passed

                    </p>

                    <p className="mt-2 text-3xl font-bold text-green-600">

                        {passedChecks.length}

                    </p>

                </div>

                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">

                    <p className="text-sm text-yellow-700">

                        Warnings

                    </p>

                    <p className="mt-2 text-3xl font-bold text-yellow-600">

                        {warnings.length}

                    </p>

                </div>

                <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                    <p className="text-sm text-red-700">

                        Failed

                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-600">

                        {failedChecks.length}

                    </p>

                </div>

            </div>

            {/* Continue in Message 2 */}
                        {/* ==========================================
                Detailed Results
            ========================================== */}

            <div className="mt-8 grid gap-6 lg:grid-cols-3">

                {/* Passed Checks */}

                <div className="rounded-xl border border-green-200 bg-green-50 p-5">

                    <h3 className="mb-4 text-lg font-semibold text-green-800">

                        ✅ Passed Checks

                    </h3>

                    <div className="max-h-72 space-y-3 overflow-y-auto">

                        {passedChecks.length > 0 ? (

                            passedChecks.map((item, index) => (

                                <div
                                    key={index}
                                    className="rounded-lg bg-white p-3 text-sm text-green-700 shadow-sm"
                                >

                                    {item}

                                </div>

                            ))

                        ) : (

                            <p className="text-sm text-green-600">

                                No passed checks yet.

                            </p>

                        )}

                    </div>

                </div>

                {/* Warnings */}

                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">

                    <h3 className="mb-4 text-lg font-semibold text-yellow-800">

                        ⚠️ Warnings

                    </h3>

                    <div className="max-h-72 space-y-3 overflow-y-auto">

                        {warnings.length > 0 ? (

                            warnings.map((item, index) => (

                                <div
                                    key={index}
                                    className="rounded-lg bg-white p-3 text-sm text-yellow-700 shadow-sm"
                                >

                                    {item}

                                </div>

                            ))

                        ) : (

                            <p className="text-sm text-yellow-600">

                                No warnings detected.

                            </p>

                        )}

                    </div>

                </div>

                {/* Failed Checks */}

                <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                    <h3 className="mb-4 text-lg font-semibold text-red-800">

                        ❌ Failed Checks

                    </h3>

                    <div className="max-h-72 space-y-3 overflow-y-auto">

                        {failedChecks.length > 0 ? (

                            failedChecks.map((item, index) => (

                                <div
                                    key={index}
                                    className="rounded-lg bg-white p-3 text-sm text-red-700 shadow-sm"
                                >

                                    {item}

                                </div>

                            ))

                        ) : (

                            <p className="text-sm text-red-600">

                                No failed checks.

                            </p>

                        )}

                    </div>

                </div>

            </div>

            {/* ==========================================
                SEO Recommendation
            ========================================== */}

            <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">

                <h3 className="text-lg font-semibold text-blue-900">

                    Recommendation

                </h3>

                <p className="mt-3 text-sm leading-6 text-blue-800">

                    {score >= 90
                        ? "Excellent! Your page is well optimized and ready for publication."
                        : score >= 70
                            ? "Your SEO is good, but a few improvements could increase search visibility."
                            : "This page needs additional SEO improvements before publishing."}

                </p>

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

SEOScoreCard.propTypes = {

    score: PropTypes.number,

    passedChecks: PropTypes.arrayOf(
        PropTypes.string
    ),

    warnings: PropTypes.arrayOf(
        PropTypes.string
    ),

    failedChecks: PropTypes.arrayOf(
        PropTypes.string
    ),

};

SEOScoreCard.defaultProps = {

    score: 0,

    passedChecks: [],

    warnings: [],

    failedChecks: [],

};

export default SEOScoreCard;