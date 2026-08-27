import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { settingsSchemas } from "../schemas/settingsSchema";

import FormInput from "../../pages/shared/forms/FormInput";
import FormTextarea from "../../pages/shared/forms/formTextarea";

import LogoUploader from "./LogoUploader";
import FaviconUploader from "./FaviconUploader";
import SaveSettingsButton from "./SaveSettingsButton";

const SiteInformationForm = ({
    initialValues,
    onSubmit,
    loading = false,
}) => {

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: {
            errors,
        },
    } = useForm({

        resolver: yupResolver(settingsSchema),

        defaultValues: {

            company_name: "",

            website_name: "",

            copyright_text: "",

            footer_text: "",

            company_description: "",

            logo: null,

            dark_logo: null,

            footer_logo: null,

            favicon: null,

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
                Company Information
            ===================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Company Information

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Basic information displayed across your website.

                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        control={control}
                        errors={errors}
                        name="company_name"
                        label="Company Name"
                        placeholder="Enter company name"
                        required
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="website_name"
                        label="Website Name"
                        placeholder="Enter website name"
                        required
                    />

                </div>

                <FormTextarea
                    control={control}
                    errors={errors}
                    name="company_description"
                    label="Company Description"
                    rows={5}
                    placeholder="Write a short description..."
                />

            </section>

            {/* =====================================
                Branding
            ===================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Branding

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Upload your website logos and favicon.

                    </p>

                </div>

                <div className="grid gap-6 lg:grid-cols-2">

                    <LogoUploader
                        label="Website Logo"
                        value={watch("logo")}
                        onChange={(file) =>
                            setValue("logo", file)
                        }
                    />

                    <LogoUploader
                        label="Dark Logo"
                        value={watch("dark_logo")}
                        onChange={(file) =>
                            setValue("dark_logo", file)
                        }
                    />

                    <LogoUploader
                        label="Footer Logo"
                        value={watch("footer_logo")}
                        onChange={(file) =>
                            setValue("footer_logo", file)
                        }
                    />

                    <FaviconUploader
                        value={watch("favicon")}
                        onChange={(file) =>
                            setValue("favicon", file)
                        }
                    />

                </div>

            </section>

            {/* =====================================
                Footer
            ===================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Footer Information

                    </h2>

                </div>

                <FormInput
                    control={control}
                    errors={errors}
                    name="copyright_text"
                    label="Copyright"
                    placeholder="© 2026 Your Company. All rights reserved."
                />

                <FormTextarea
                    control={control}
                    errors={errors}
                    name="footer_text"
                    label="Footer Description"
                    rows={4}
                    placeholder="Footer text..."
                />

            </section>

            {/* =====================================
                Submit
            ===================================== */}

            <div className="flex justify-end border-t border-gray-200 pt-6">

                <SaveSettingsButton
                    type="submit"
                    loading={loading}
                    text="Save Site Information"
                    loadingText="Saving..."
                    successText="Saved"
                />

            </div>

        </form>

    );

};

SiteInformationForm.propTypes = {

    initialValues: PropTypes.object,

    onSubmit: PropTypes.func.isRequired,

    loading: PropTypes.bool,

};

SiteInformationForm.defaultProps = {

    initialValues: {},

    loading: false,

};

export default SiteInformationForm;