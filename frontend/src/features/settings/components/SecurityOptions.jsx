import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Shield } from "lucide-react";

import { settingsSchemas } from "../schemas/settingsSchema";

import FormCheckbox from "../../pages/shared/forms/FormCheckbox";
import FormInput from "../../pages/shared/forms/FormInput";
import FormSelect from "../../pages/shared/forms/FormSelect";



import SaveSettingsButton from "./SaveSettingsButton";

const passwordExpiryOptions = [
    {
        value: 0,
        label: "Never",
    },
    {
        value: 30,
        label: "30 Days",
    },
    {
        value: 60,
        label: "60 Days",
    },
    {
        value: 90,
        label: "90 Days",
    },
    {
        value: 180,
        label: "180 Days",
    },
];

const SecurityOptions = ({
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

            force_strong_password: true,

            password_expiry_days: 90,

            enable_two_factor: false,

            max_login_attempts: 5,

            lockout_duration: 15,

            session_timeout: 30,

            remember_me: true,

            notify_failed_login: true,

            trusted_devices: true,

            ip_whitelist_enabled: false,

            ip_whitelist: "",

            ...initialValues,

        },

    });

    useEffect(() => {

        if (initialValues) {

            reset(initialValues);

        }

    }, [initialValues, reset]);

    const ipWhitelistEnabled = watch("ip_whitelist_enabled");

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10"
        >

            {/* =====================================
                Password Security
            ===================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">

                <div className="flex items-center gap-3">

                    <Shield
                        size={24}
                        className="text-blue-600"
                    />

                    <div>

                        <h2 className="text-lg font-semibold text-gray-900">

                            Password Security

                        </h2>

                        <p className="text-sm text-gray-500">

                            Configure password policies for all users.

                        </p>

                    </div>

                </div>

                <div className="space-y-5">

                    <FormCheckbox
                        control={control}
                        name="force_strong_password"
                        label="Require Strong Passwords"
                    />

                    <FormCheckbox
                        control={control}
                        name="enable_two_factor"
                        label="Enable Two-Factor Authentication (2FA)"
                    />

                    <FormSelect
                        control={control}
                        errors={errors}
                        name="password_expiry_days"
                        label="Password Expiration"
                        placeholder="Select expiration period"
                        options={passwordExpiryOptions}
                    />

                </div>

            </section>

                        {/* =====================================
                Login Protection
            ===================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Login Protection

                    </h2>

                    <p className="text-sm text-gray-500">

                        Configure login attempt limits and automatic account
                        lockout settings.

                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        control={control}
                        errors={errors}
                        name="max_login_attempts"
                        label="Maximum Login Attempts"
                        type="number"
                        placeholder="5"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="lockout_duration"
                        label="Lockout Duration (Minutes)"
                        type="number"
                        placeholder="15"
                    />

                </div>

            </section>

            {/* =====================================
                Session Management
            ===================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Session Management

                    </h2>

                    <p className="text-sm text-gray-500">

                        Configure user session timeout and login persistence.

                    </p>

                </div>

                <div className="grid gap-8 lg:grid-cols-2">

                    <FormInput
                        control={control}
                        errors={errors}
                        name="session_timeout"
                        label="Session Timeout (Minutes)"
                        type="number"
                        placeholder="30"
                    />

                    <div className="space-y-5">

                        <FormCheckbox
                            control={control}
                            name="remember_me"
                            label="Allow 'Remember Me'"
                        />

                        <FormCheckbox
                            control={control}
                            name="trusted_devices"
                            label="Allow Trusted Devices"
                        />

                        <FormCheckbox
                            control={control}
                            name="notify_failed_login"
                            label="Notify User After Failed Login"
                        />

                    </div>

                </div>

            </section>

                        {/* =====================================
                IP Whitelist
            ===================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        IP Whitelist

                    </h2>

                    <p className="text-sm text-gray-500">

                        Restrict administrator access to approved IP addresses.

                    </p>

                </div>

                <FormCheckbox
                    control={control}
                    name="ip_whitelist_enabled"
                    label="Enable IP Whitelist"
                />

                {ipWhitelistEnabled && (

                    <>
                        <FormInput
                            control={control}
                            errors={errors}
                            name="ip_whitelist"
                            label="Allowed IP Addresses"
                            placeholder="127.0.0.1, 192.168.1.10"
                        />

                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

                            <p className="text-sm text-amber-700">

                                Enter one or more IP addresses separated by commas.
                                Only these IP addresses will be allowed to access
                                the administration panel while IP Whitelist is enabled.

                            </p>

                        </div>

                    </>

                )}

            </section>

            {/* =====================================
                Actions
            ===================================== */}

            <div className="flex justify-end border-t border-gray-200 pt-6">

                <SaveSettingsButton
                    type="submit"
                    loading={loading}
                    text="Save Security Settings"
                    loadingText="Saving..."
                    successText="Security Updated"
                />

            </div>

        </form>

    );

};

SecurityOptions.propTypes = {

    initialValues: PropTypes.shape({

        force_strong_password: PropTypes.bool,

        password_expiry_days: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),

        enable_two_factor: PropTypes.bool,

        max_login_attempts: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),

        lockout_duration: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),

        session_timeout: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),

        remember_me: PropTypes.bool,

        notify_failed_login: PropTypes.bool,

        trusted_devices: PropTypes.bool,

        ip_whitelist_enabled: PropTypes.bool,

        ip_whitelist: PropTypes.string,

    }),

    onSubmit: PropTypes.func.isRequired,

    loading: PropTypes.bool,

};

SecurityOptions.defaultProps = {

    initialValues: {},

    loading: false,

};

export default SecurityOptions;