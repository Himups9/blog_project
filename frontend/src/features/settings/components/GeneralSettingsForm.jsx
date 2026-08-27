import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { settingsSchemas } from "../schemas/settingsSchema";

import FormInput from "../../pages/shared/forms/FacebookInput";
import FormTextarea from "../../pages/shared/forms/formTextarea";

import SaveSettingsButton from "./SaveSettingsButton";

const GeneralSettingsForm = ({
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

        resolver: yupResolver(
            settingsSchemas.generalSettingsSchema
        ),

        defaultValues: {

            site_name: "",

            site_description: "",

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
            className="space-y-8"
        >

            {/* =====================================
                Basic Information
            ===================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Basic Information

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Configure the primary information for your website.

                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        control={control}
                        errors={errors}
                        name="site_name"
                        label="Site Name"
                        placeholder="Enter site name"
                        required
                    />

                    <FormTextarea
                        control={control}
                        errors={errors}
                        name="site_description"
                        label="Site Description"
                        placeholder="Enter site description"
                        rows={4}
                    />

                </div>

            </section>

            {/* =====================================
                Save Button
            ===================================== */}

            <div className="flex justify-end border-t border-gray-200 pt-6">

                <SaveSettingsButton
                    type="submit"
                    loading={loading}
                    text="Save General Settings"
                    loadingText="Saving Settings..."
                    successText="Settings Saved"
                />

            </div>

        </form>

    );

};

GeneralSettingsForm.propTypes = {

    initialValues: PropTypes.shape({

        site_name: PropTypes.string,

        site_description: PropTypes.string,

    }),

    onSubmit: PropTypes.func.isRequired,

    loading: PropTypes.bool,

};

export default GeneralSettingsForm;
