import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { settingsSchemas } from "../schemas/settingsSchema";

import FormInput from "../../pages/shared/forms/FormInput";

import SaveSettingsButton from "./SaveSettingsButton";

const SocialMediaForm = ({
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

            facebook_url: "",

            instagram_url: "",

            twitter_url: "",

            linkedin_url: "",

            youtube_url: "",

            tiktok_url: "",

            github_url: "",

            pinterest_url: "",

            telegram_url: "",

            whatsapp_url: "",

            discord_url: "",

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
                Social Media Links
            ===================================== */}

            <section className="space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Social Media Links

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Add links to your organization's official social media profiles.

                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        control={control}
                        errors={errors}
                        name="facebook_url"
                        label="Facebook"
                        placeholder="https://facebook.com/yourpage"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="instagram_url"
                        label="Instagram"
                        placeholder="https://instagram.com/yourprofile"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="twitter_url"
                        label="X (Twitter)"
                        placeholder="https://x.com/yourprofile"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="linkedin_url"
                        label="LinkedIn"
                        placeholder="https://linkedin.com/company/yourcompany"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="youtube_url"
                        label="YouTube"
                        placeholder="https://youtube.com/@yourchannel"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="tiktok_url"
                        label="TikTok"
                        placeholder="https://tiktok.com/@yourprofile"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="github_url"
                        label="GitHub"
                        placeholder="https://github.com/yourusername"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="pinterest_url"
                        label="Pinterest"
                        placeholder="https://pinterest.com/yourprofile"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="telegram_url"
                        label="Telegram"
                        placeholder="https://t.me/yourchannel"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="whatsapp_url"
                        label="WhatsApp"
                        placeholder="https://wa.me/97798XXXXXXXX"
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="discord_url"
                        label="Discord"
                        placeholder="https://discord.gg/yourserver"
                    />

                </div>

            </section>

            {/* =====================================
                Submit
            ===================================== */}

            <div className="flex justify-end border-t border-gray-200 pt-6">

                <SaveSettingsButton
                    type="submit"
                    loading={loading}
                    text="Save Social Media"
                    loadingText="Saving..."
                    successText="Saved"
                />

            </div>

        </form>

    );

};

SocialMediaForm.propTypes = {

    initialValues: PropTypes.object,

    onSubmit: PropTypes.func.isRequired,

    loading: PropTypes.bool,

};

SocialMediaForm.defaultProps = {

    initialValues: {},

    loading: false,

};

export default SocialMediaForm;