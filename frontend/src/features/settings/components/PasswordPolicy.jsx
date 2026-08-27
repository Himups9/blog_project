import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Lock,
    ShieldCheck,
} from "lucide-react";

import { passwordPolicySchema } from "../schemas/settingsSchema";

import FormInput from "../../pages/shared/forms/FacebookInput";
import FormTextarea from "../../pages/shared/forms/formTextarea";

import SaveSettingsButton from "./SaveSettingsButton";

const DEFAULT_VALUES = {

    minimum_length: 8,

    maximum_length: 64,

    require_uppercase: true,

    require_lowercase: true,

    require_number: true,

    require_special_character: true,

    prevent_password_reuse: true,

    password_history: 5,

    password_expiry_days: 90,

    expiry_warning_days: 7,

};

const PasswordPolicy = ({
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

        resolver: yupResolver(passwordPolicySchema),

        defaultValues: {

            ...DEFAULT_VALUES,

            ...initialValues,

        },

        mode: "onChange",

    });

    useEffect(() => {

        reset({

            ...DEFAULT_VALUES,

            ...initialValues,

        });

    }, [initialValues, reset]);

    const policy = watch();

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10"
        >

            {/* =====================================
                Password Rules
            ===================================== */}

            <section className="space-y-6">

                <div className="flex items-center gap-3">

                    <Lock
                        size={24}
                        className="text-blue-600"
                    />

                    <div>

                        <h2 className="text-lg font-semibold text-gray-900">

                            Password Rules

                        </h2>

                        <p className="text-sm text-gray-500">

                            Configure password complexity requirements.

                        </p>

                    </div>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        control={control}
                        errors={errors}
                        name="minimum_length"
                        label="Minimum Length"
                        type="number"
                        autoComplete="off"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="maximum_length"
                        label="Maximum Length"
                        type="number"
                        autoComplete="off"
                    />

                </div>

                <div className="space-y-5">

                    <FormCheckbox
                        control={control}
                        name="require_uppercase"
                        label="Require Uppercase Letters"
                    />

                    <FormCheckbox
                        control={control}
                        name="require_lowercase"
                        label="Require Lowercase Letters"
                    />

                    <FormCheckbox
                        control={control}
                        name="require_number"
                        label="Require Numbers"
                    />

                    <FormCheckbox
                        control={control}
                        name="require_special_character"
                        label="Require Special Characters"
                    />

                </div>

            </section>

            {/* =====================================
                Password Security
            ===================================== */}

            <section className="space-y-6">

                <div className="flex items-center gap-3">

                    <ShieldCheck
                        size={24}
                        className="text-blue-600"
                    />

                    <div>

                        <h2 className="text-lg font-semibold text-gray-900">

                            Password Security

                        </h2>

                        <p className="text-sm text-gray-500">

                            Configure password expiration and reuse policies.

                        </p>

                    </div>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        control={control}
                        errors={errors}
                        name="password_history"
                        label="Remember Previous Passwords"
                        type="number"
                        placeholder="5"
                        autoComplete="off"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="password_expiry_days"
                        label="Password Expiry (Days)"
                        type="number"
                        placeholder="90"
                        autoComplete="off"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="expiry_warning_days"
                        label="Expiry Warning (Days)"
                        type="number"
                        placeholder="7"
                        autoComplete="off"
                    />

                </div>

                <div className="space-y-5">

                    <FormCheckbox
                        control={control}
                        name="prevent_password_reuse"
                        label="Prevent Password Reuse"
                    />

                </div>

            </section>

                        {/* =====================================
                Policy Preview
            ===================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Policy Preview

                    </h2>

                    <p className="text-sm text-gray-500">

                        This preview shows the password requirements that users
                        must satisfy when creating or changing their password.

                    </p>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                    <ul className="space-y-3 text-sm text-gray-700">

                        <li>

                            • Password must contain at least{" "}

                            <strong>

                                {policy.minimum_length}

                            </strong>

                            {" "}characters.

                        </li>

                        <li>

                            • Password cannot exceed{" "}

                            <strong>

                                {policy.maximum_length}

                            </strong>

                            {" "}characters.

                        </li>

                        {policy.require_uppercase && (

                            <li>

                                • Must include at least one uppercase letter.

                            </li>

                        )}

                        {policy.require_lowercase && (

                            <li>

                                • Must include at least one lowercase letter.

                            </li>

                        )}

                        {policy.require_number && (

                            <li>

                                • Must include at least one numeric digit.

                            </li>

                        )}

                        {policy.require_special_character && (

                            <li>

                                • Must include at least one special character.

                            </li>

                        )}

                        {policy.prevent_password_reuse && (

                            <li>

                                • Users cannot reuse their last{" "}

                                <strong>

                                    {policy.password_history}

                                </strong>

                                {" "}passwords.

                            </li>

                        )}

                        <li>

                            • Password expires every{" "}

                            <strong>

                                {policy.password_expiry_days}

                            </strong>

                            {" "}days.

                        </li>

                        <li>

                            • Users receive an expiry reminder{" "}

                            <strong>

                                {policy.expiry_warning_days}

                            </strong>

                            {" "}days before expiration.

                        </li>

                    </ul>

                </div>

            </section>

            {/* =====================================
                Actions
            ===================================== */}

            <div className="flex justify-end border-t border-gray-200 pt-6">

                <SaveSettingsButton

                    type="submit"

                    loading={loading}

                    text="Save Password Policy"

                    loadingText="Saving..."

                    successText="Policy Saved"

                />

            </div>

        </form>

    );

};

PasswordPolicy.propTypes = {

    initialValues: PropTypes.shape({

        minimum_length: PropTypes.oneOfType([

            PropTypes.number,

            PropTypes.string,

        ]),

        maximum_length: PropTypes.oneOfType([

            PropTypes.number,

            PropTypes.string,

        ]),

        require_uppercase: PropTypes.bool,

        require_lowercase: PropTypes.bool,

        require_number: PropTypes.bool,

        require_special_character: PropTypes.bool,

        prevent_password_reuse: PropTypes.bool,

        password_history: PropTypes.oneOfType([

            PropTypes.number,

            PropTypes.string,

        ]),

        password_expiry_days: PropTypes.oneOfType([

            PropTypes.number,

            PropTypes.string,

        ]),

        expiry_warning_days: PropTypes.oneOfType([

            PropTypes.number,

            PropTypes.string,

        ]),

    }),

    onSubmit: PropTypes.func.isRequired,

    loading: PropTypes.bool,

};

PasswordPolicy.defaultProps = {

    initialValues: {},

    loading: false,

};

export default PasswordPolicy;