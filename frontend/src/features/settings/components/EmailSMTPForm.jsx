import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Send } from "lucide-react";

import { settingsSchemas } from "../schemas/settingsSchema";

import FormInput from "../../pages/shared/forms/FormInput";
import FormSelect from "../../pages/shared/forms/FormSelect";
import FormCheckbox from "../../pages/shared/forms/FormCheckbox";

import SaveSettingsButton from "./SaveSettingsButton";

const encryptionOptions = [
    {
        value: "none",
        label: "None",
    },
    {
        value: "ssl",
        label: "SSL",
    },
    {
        value: "tls",
        label: "TLS",
    },
];

const EmailSMTPForm = ({
    initialValues,
    onSubmit,
    onSendTestEmail,
    loading = false,
    testing = false,
}) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm({

        resolver: yupResolver(settingsSchema),

        defaultValues: {

            smtp_host: "",

            smtp_port: 587,

            smtp_username: "",

            smtp_password: "",

            smtp_encryption: "tls",

            sender_name: "",

            sender_email: "",

            reply_to_email: "",

            smtp_authentication: true,

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

            {/* ==========================================
                SMTP Server
            ========================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        SMTP Server

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Configure your outgoing mail server.

                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        control={control}
                        errors={errors}
                        name="smtp_host"
                        label="SMTP Host"
                        placeholder="smtp.gmail.com"
                        required
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="smtp_port"
                        label="SMTP Port"
                        type="number"
                        required
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="smtp_username"
                        label="SMTP Username"
                        placeholder="username"
                        required
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="smtp_password"
                        label="SMTP Password"
                        type="password"
                        placeholder="••••••••"
                        required
                    />

                    <FormSelect
                        control={control}
                        errors={errors}
                        name="smtp_encryption"
                        label="Encryption"
                        options={encryptionOptions}
                    />

                    <FormCheckbox
                        control={control}
                        name="smtp_authentication"
                        label="SMTP Authentication"
                    />

                </div>

            </section>

            {/* ==========================================
                Sender Information
            ========================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Sender Information

                    </h2>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        control={control}
                        errors={errors}
                        name="sender_name"
                        label="Sender Name"
                        placeholder="Himalaya Tech"
                        required
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="sender_email"
                        label="Sender Email"
                        type="email"
                        placeholder="noreply@example.com"
                        required
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="reply_to_email"
                        label="Reply-To Email"
                        type="email"
                        placeholder="support@example.com"
                    />

                </div>

            </section>

            {/* ==========================================
                Actions
            ========================================== */}

            <div className="flex flex-col justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">

                <button
                    type="button"
                    onClick={onSendTestEmail}
                    disabled={testing}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-5 py-3 font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Send size={18} />

                    {testing
                        ? "Sending..."
                        : "Send Test Email"}
                </button>

                <SaveSettingsButton
                    type="submit"
                    loading={loading}
                    text="Save SMTP Settings"
                    loadingText="Saving..."
                    successText="Saved"
                />

            </div>

        </form>

    );

};

EmailSMTPForm.propTypes = {

    initialValues: PropTypes.object,

    onSubmit: PropTypes.func.isRequired,

    onSendTestEmail: PropTypes.func,

    loading: PropTypes.bool,

    testing: PropTypes.bool,

};

EmailSMTPForm.defaultProps = {

    initialValues: {},

    onSendTestEmail: () => {},

    loading: false,

    testing: false,

};

export default EmailSMTPForm;