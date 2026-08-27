import PropTypes from "prop-types";
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    Shield,
    Wrench,
} from "lucide-react";

import SaveSettingsButton from "./SaveSettingsButton";

const MaintenanceBanner = ({
    enabled = false,
    loading = false,
    message = "",
    startTime = "",
    endTime = "",
    whitelistEnabled = false,
    onToggle,
    onSave,
}) => {

    return (

        <div className="space-y-6">

            {/* Status */}

            <div
                className={[
                    "rounded-2xl border p-6 shadow-sm",
                    enabled
                        ? "border-amber-300 bg-amber-50"
                        : "border-green-300 bg-green-50",
                ].join(" ")}
            >

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-start gap-4">

                        <div
                            className={[
                                "rounded-full p-3",
                                enabled
                                    ? "bg-amber-100"
                                    : "bg-green-100",
                            ].join(" ")}
                        >

                            {enabled ? (

                                <AlertTriangle
                                    className="text-amber-600"
                                    size={26}
                                />

                            ) : (

                                <CheckCircle2
                                    className="text-green-600"
                                    size={26}
                                />

                            )}

                        </div>

                        <div>

                            <h2 className="text-xl font-semibold">

                                Maintenance Mode

                            </h2>

                            <p className="mt-1 text-sm text-gray-600">

                                {enabled
                                    ? "The website is currently in maintenance mode."
                                    : "The website is operating normally."}

                            </p>

                        </div>

                    </div>

                    <label className="flex items-center gap-3">

                        <span className="text-sm font-medium">

                            {enabled
                                ? "Enabled"
                                : "Disabled"}

                        </span>

                        <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(event) =>
                                onToggle(event.target.checked)
                            }
                            disabled={loading}
                            className="h-5 w-5"
                        />

                    </label>

                </div>

            </div>

            {/* Maintenance Details */}

            <div className="grid gap-6 lg:grid-cols-3">

                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <div className="mb-4 flex items-center gap-3">

                        <Clock
                            className="text-blue-600"
                            size={22}
                        />

                        <h3 className="font-semibold">

                            Schedule

                        </h3>

                    </div>

                    <div className="space-y-3 text-sm">

                        <div>

                            <span className="font-medium">

                                Start:

                            </span>

                            <div className="text-gray-600">

                                {startTime || "Not Scheduled"}

                            </div>

                        </div>

                        <div>

                            <span className="font-medium">

                                End:

                            </span>

                            <div className="text-gray-600">

                                {endTime || "Not Scheduled"}

                            </div>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <div className="mb-4 flex items-center gap-3">

                        <Wrench
                            className="text-orange-600"
                            size={22}
                        />

                        <h3 className="font-semibold">

                            Maintenance Message

                        </h3>

                    </div>

                    <p className="text-sm text-gray-600">

                        {message ||
                            "The system is undergoing scheduled maintenance. Please check back later."}

                    </p>

                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <div className="mb-4 flex items-center gap-3">

                        <Shield
                            className="text-green-600"
                            size={22}
                        />

                        <h3 className="font-semibold">

                            Access Control

                        </h3>

                    </div>

                    <p className="text-sm text-gray-600">

                        {whitelistEnabled
                            ? "Administrators and whitelisted IP addresses can access the website."
                            : "Only administrators can access the website."}

                    </p>

                </div>

            </div>

            {/* Warning */}

            {enabled && (

                <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

                    <div className="flex gap-3">

                        <AlertTriangle
                            className="mt-1 text-red-600"
                            size={22}
                        />

                        <div>

                            <h3 className="font-semibold text-red-700">

                                Maintenance Mode Enabled

                            </h3>

                            <p className="mt-2 text-sm text-red-600">

                                Visitors will not be able to access your
                                website until maintenance mode is disabled.
                                Only authorized users can continue browsing.

                            </p>

                        </div>

                    </div>

                </div>

            )}

            {/* Save */}

            <div className="flex justify-end border-t border-gray-200 pt-6">

                <SaveSettingsButton
                    type="button"
                    loading={loading}
                    text="Save Maintenance Settings"
                    loadingText="Saving..."
                    successText="Saved"
                    onClick={onSave}
                />

            </div>

        </div>

    );

};

MaintenanceBanner.propTypes = {

    enabled: PropTypes.bool,

    loading: PropTypes.bool,

    message: PropTypes.string,

    startTime: PropTypes.string,

    endTime: PropTypes.string,

    whitelistEnabled: PropTypes.bool,

    onToggle: PropTypes.func.isRequired,

    onSave: PropTypes.func.isRequired,

};

MaintenanceBanner.defaultProps = {

    enabled: false,

    loading: false,

    message: "",

    startTime: "",

    endTime: "",

    whitelistEnabled: false,

};

export default MaintenanceBanner;