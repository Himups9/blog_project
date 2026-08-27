import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { settingsSchemas } from "../schemas/settingsSchema";

import FormInput from "../../pages/shared/forms/FormInput";
import FormTextarea from "../../pages/shared/forms/formTextarea";

import SaveSettingsButton from "./SaveSettingsButton";

const ContactForm = ({
    initialValues,
    onSubmit,
    loading = false,
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

            contact_email: "",

            support_email: "",

            phone: "",

            mobile: "",

            fax: "",

            address: "",

            office_hours: "",

            google_map_url: "",

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

            {/* =====================================
                Contact Information
            ===================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Contact Information

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Manage the public contact details displayed on your website.

                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        control={control}
                        errors={errors}
                        name="contact_email"
                        label="Contact Email"
                        type="email"
                        placeholder="contact@example.com"
                        required
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="support_email"
                        label="Support Email"
                        type="email"
                        placeholder="support@example.com"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="phone"
                        label="Phone Number"
                        placeholder="+977-1-1234567"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="mobile"
                        label="Mobile Number"
                        placeholder="+977-98XXXXXXXX"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="fax"
                        label="Fax"
                        placeholder="+977-1-1234568"
                    />

                </div>

            </section>

            {/* =====================================
                Address
            ===================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Office Address

                    </h2>

                </div>

                <FormTextarea
                    control={control}
                    errors={errors}
                    name="address"
                    label="Office Address"
                    rows={4}
                    placeholder="Enter your complete office address"
                />

            </section>

            {/* =====================================
                Office Hours
            ===================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Office Hours

                    </h2>

                </div>

                <FormTextarea
                    control={control}
                    errors={errors}
                    name="office_hours"
                    label="Business Hours"
                    rows={4}
                    placeholder="Sunday - Friday: 9:00 AM - 5:00 PM"
                />

            </section>

            {/* =====================================
                Google Map
            ===================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Google Maps

                    </h2>

                </div>

                <FormInput
                    control={control}
                    errors={errors}
                    name="google_map_url"
                    label="Google Maps Embed URL"
                    placeholder="https://www.google.com/maps/embed?..."
                />

            </section>

            {/* =====================================
                Submit
            ===================================== */}

            <div className="flex justify-end border-t border-gray-200 pt-6">

                <SaveSettingsButton
                    type="submit"
                    loading={loading}
                    text="Save Contact Settings"
                    loadingText="Saving..."
                    successText="Saved"
                />

            </div>

        </form>

    );

};

ContactForm.propTypes = {

    initialValues: PropTypes.object,

    onSubmit: PropTypes.func.isRequired,

    loading: PropTypes.bool,

};

ContactForm.defaultProps = {

    initialValues: {},

    loading: false,

};

export default ContactForm;