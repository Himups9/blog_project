import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    CalendarClock,
    Clock,
    Shield,
} from "lucide-react";

import { settingsSchemas } from "../schemas/settingsSchema";


import FormInput from "../../pages/shared/forms/FacebookInput";
import FormTextarea from "../../pages/shared/forms/formTextarea";

import SaveSettingsButton from "./SaveSettingsButton";

const timezoneOptions = [
    {
        value: "Asia/Kathmandu",
        label: "Asia/Kathmandu (UTC+05:45)",
    },
    {
        value: "UTC",
        label: "UTC",
    },
    {
        value: "Asia/Kolkata",
        label: "Asia/Kolkata",
    },
    {
        value: "Europe/London",
        label: "Europe/London",
    },
    {
        value: "America/New_York",
        label: "America/New_York",
    },
];

const recurrenceOptions = [
    {
        value: "none",
        label: "No Repeat",
    },
    {
        value: "daily",
        label: "Daily",
    },
    {
        value: "weekly",
        label: "Weekly",
    },
    {
        value: "monthly",
        label: "Monthly",
    },
];

const MaintenanceSchedule = ({
    initialValues,
    onSubmit,
    loading = false,
}) => {

    const {
        control,
        watch,
        reset,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm({

        resolver: yupResolver(settingsSchema),

        defaultValues: {

            enable_schedule: false,

            maintenance_title: "Scheduled Maintenance",

            maintenance_message:
                "We are performing scheduled maintenance. Please check back soon.",

            start_datetime: "",

            end_datetime: "",

            timezone: "Asia/Kathmandu",

            recurrence: "none",

            allow_admin_access: true,

            allow_whitelist: true,

            ...initialValues,

        },

    });

    useEffect(() => {

        if (initialValues) {

            reset(initialValues);

        }

    }, [initialValues, reset]);

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10"
        >

            {/* Schedule */}

            <section className="space-y-6">

                <div className="flex items-center gap-3">

                    <CalendarClock
                        size={24}
                        className="text-blue-600"
                    />

                    <div>

                        <h2 className="text-lg font-semibold text-gray-900">

                            Maintenance Schedule

                        </h2>

                        <p className="text-sm text-gray-500">

                            Configure when maintenance mode should start and end.

                        </p>

                    </div>

                </div>

                <FormCheckbox
                    control={control}
                    name="enable_schedule"
                    label="Enable Scheduled Maintenance"
                />

                {watch("enable_schedule") && (

                    <div className="grid gap-6 md:grid-cols-2">

                        <FormInput
                            control={control}
                            errors={errors}
                            name="start_datetime"
                            label="Start Date & Time"
                            type="datetime-local"
                        />

                        <FormInput
                            control={control}
                            errors={errors}
                            name="end_datetime"
                            label="End Date & Time"
                            type="datetime-local"
                        />

                        <FormSelect
                            control={control}
                            errors={errors}
                            name="timezone"
                            label="Timezone"
                            options={timezoneOptions}
                        />

                        <FormSelect
                            control={control}
                            errors={errors}
                            name="recurrence"
                            label="Repeat Schedule"
                            options={recurrenceOptions}
                        />

                    </div>

                )}

            </section>

            {/* Maintenance Page */}

            <section className="space-y-6">

                <div className="flex items-center gap-3">

                    <Clock
                        size={24}
                        className="text-orange-600"
                    />

                    <div>

                        <h2 className="text-lg font-semibold text-gray-900">

                            Maintenance Page

                        </h2>

                        <p className="text-sm text-gray-500">

                            Customize the message visitors see during maintenance.

                        </p>

                    </div>

                </div>

                <FormInput
                    control={control}
                    errors={errors}
                    name="maintenance_title"
                    label="Maintenance Title"
                    placeholder="Scheduled Maintenance"
                />

                <FormTextarea
                    control={control}
                    errors={errors}
                    name="maintenance_message"
                    label="Maintenance Message"
                    rows={5}
                    placeholder="Enter your maintenance message..."
                />

            </section>

            {/* Access */}

            <section className="space-y-6">

                <div className="flex items-center gap-3">

                    <Shield
                        size={24}
                        className="text-green-600"
                    />

                    <div>

                        <h2 className="text-lg font-semibold text-gray-900">

                            Access During Maintenance

                        </h2>

                        <p className="text-sm text-gray-500">

                            Control who can access the website while maintenance mode is active.

                        </p>

                    </div>

                </div>

                <div className="space-y-5">

                    <FormCheckbox
                        control={control}
                        name="allow_admin_access"
                        label="Allow Administrators"
                    />

                    <FormCheckbox
                        control={control}
                        name="allow_whitelist"
                        label="Allow Whitelisted IP Addresses"
                    />

                </div>

            </section>

            {/* Save */}

            <div className="flex justify-end border-t border-gray-200 pt-6">

                <SaveSettingsButton
                    type="submit"
                    loading={loading}
                    text="Save Schedule"
                    loadingText="Saving..."
                    successText="Schedule Saved"
                />

            </div>

        </form>

    );

};

MaintenanceSchedule.propTypes = {

    initialValues: PropTypes.object,

    onSubmit: PropTypes.func.isRequired,

    loading: PropTypes.bool,

};

MaintenanceSchedule.defaultProps = {

    initialValues: {},

    loading: false,

};

export default MaintenanceSchedule;