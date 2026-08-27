import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
    Settings,
    Globe,
    MessageSquare,
    Search,
    Send,
    Shield,
    Rss,
} from "lucide-react";

import FormInput from "../../../pages/shared/forms/FormInput";
import FormTextarea from "../../../pages/shared/forms/formTextarea";
import FormCheckbox from "../../../pages/shared/forms/FormCheckbox";
import FormSelect from "../../../pages/shared/forms/FormSelect";
import SubmitButton from "../../../pages/shared/forms/SubmitButton";

import useBlog from "../../hooks/useBlog";

const BlogSettings = () => {

    const {
        control,
        reset,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm({

        defaultValues: {

            blog_name: "",
            blog_description: "",

            posts_per_page: 10,

            allow_comments: true,
            moderate_comments: true,

            enable_rss: true,

            enable_social_share: true,

            notify_new_comment: true,

            auto_publish: false,

            default_status: "draft",

            enable_seo: true,

            sitemap_enabled: true,

        },

    });

    const {

        blogSettings,
        getBlogSettings,
        updateBlogSettings,
        loading,

    } = useBlog();

    useEffect(() => {

        const loadSettings = async () => {

            try {

                const data = await getBlogSettings();

                reset(data);

            } catch {

                toast.error("Unable to load blog settings.");

            }

        };

        loadSettings();

    }, [getBlogSettings, reset]);

    const onSubmit = async (data) => {

        try {

            await updateBlogSettings(data);

            toast.success("Blog settings updated.");

        } catch {

            toast.error("Unable to save settings.");

        }

    };

    return (

        <div className="space-y-8">

            <div className="flex items-center gap-3">

                <Settings
                    size={32}
                    className="text-blue-600"
                />

                <div>

                    <h1 className="text-3xl font-bold">

                        Blog Settings

                    </h1>

                    <p className="text-gray-500">

                        Configure global blog preferences.

                    </p>

                </div>

            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
            >

                {/* General */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <div className="mb-6 flex items-center gap-3">

                        <Globe className="text-blue-600" />

                        <h2 className="text-xl font-semibold">

                            General Settings

                        </h2>

                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        <FormInput
                            control={control}
                            errors={errors}
                            name="blog_name"
                            label="Blog Name"
                        />

                        <FormInput
                            control={control}
                            errors={errors}
                            name="posts_per_page"
                            type="number"
                            label="Posts Per Page"
                        />

                    </div>

                    <div className="mt-6">

                        <FormTextarea
                            control={control}
                            errors={errors}
                            name="blog_description"
                            label="Description"
                        />

                    </div>

                </section>

                {/* Publishing */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <div className="mb-6 flex items-center gap-3">

                        <Send className="text-green-600" />

                        <h2 className="text-xl font-semibold">

                            Publishing

                        </h2>

                    </div>

                    <div className="space-y-5">

                        <FormCheckbox
                            control={control}
                            name="auto_publish"
                            label="Automatically publish approved posts"
                        />

                        <FormSelect
                            control={control}
                            errors={errors}
                            name="default_status"
                            label="Default Status"
                            options={[
                                {
                                    value: "draft",
                                    label: "Draft",
                                },
                                {
                                    value: "published",
                                    label: "Published",
                                },
                                {
                                    value: "pending",
                                    label: "Pending Review",
                                },
                            ]}
                        />

                    </div>

                </section>

                {/* Comments */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <div className="mb-6 flex items-center gap-3">

                        <MessageSquare className="text-purple-600" />

                        <h2 className="text-xl font-semibold">

                            Comments

                        </h2>

                    </div>

                    <div className="space-y-5">

                        <FormCheckbox
                            control={control}
                            name="allow_comments"
                            label="Allow comments"
                        />

                        <FormCheckbox
                            control={control}
                            name="moderate_comments"
                            label="Moderate comments before publishing"
                        />

                        <FormCheckbox
                            control={control}
                            name="notify_new_comment"
                            label="Email notification for new comments"
                        />

                    </div>

                </section>

                {/* SEO */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <div className="mb-6 flex items-center gap-3">

                        <Search className="text-orange-600" />

                        <h2 className="text-xl font-semibold">

                            SEO

                        </h2>

                    </div>

                    <FormCheckbox
                        control={control}
                        name="enable_seo"
                        label="Enable SEO features"
                    />

                </section>

                {/* RSS */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <div className="mb-6 flex items-center gap-3">

                        <Rss className="text-red-600" />

                        <h2 className="text-xl font-semibold">

                            RSS & Sitemap

                        </h2>

                    </div>

                    <div className="space-y-5">

                        <FormCheckbox
                            control={control}
                            name="enable_rss"
                            label="Enable RSS Feed"
                        />

                        <FormCheckbox
                            control={control}
                            name="sitemap_enabled"
                            label="Generate XML Sitemap"
                        />

                    </div>

                </section>

                {/* Social */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <div className="mb-6 flex items-center gap-3">

                        <Shield className="text-indigo-600" />

                        <h2 className="text-xl font-semibold">

                            Social Sharing

                        </h2>

                    </div>

                    <FormCheckbox
                        control={control}
                        name="enable_social_share"
                        label="Enable social share buttons"
                    />

                </section>

                <div className="flex justify-end">

                    <SubmitButton
                        loading={loading}
                        text="Save Settings"
                        loadingText="Saving..."
                    />

                </div>

            </form>

        </div>

    );

};

export default BlogSettings;