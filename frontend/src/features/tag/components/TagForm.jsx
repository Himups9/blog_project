import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInput from "../../pages/shared/forms/FormInput";
import FormTextarea from "../../pages/shared/forms/formTextarea";
import SubmitButton from "../../pages/shared/forms/SubmitButton";

import { tagSchema } from "../validation/tagSchema";

const TagForm = ({
    initialValues = {},
    onSubmit,
    loading = false,
    mode = "create",
}) => {

    /*
    |--------------------------------------------------------------------------
    | React Hook Form
    |--------------------------------------------------------------------------
    */

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(tagSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",

            color: "#2563eb",
            icon: "",

            meta_title: "",
            meta_description: "",
            meta_keywords: "",

            is_active: true,
            is_featured: false,

            ...initialValues,
        },
    });

    /*
    |--------------------------------------------------------------------------
    | Auto Generate Slug
    |--------------------------------------------------------------------------
    */

    const tagName = watch("name");

    useEffect(() => {

        if (mode !== "create") return;

        if (!tagName) return;

        const slug = tagName
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");

        setValue("slug", slug);

    }, [tagName, mode, setValue]);

    /*
    |--------------------------------------------------------------------------
    | Update Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!initialValues) return;

        Object.entries(initialValues).forEach(([key, value]) => {
            setValue(key, value);
        });

    }, [initialValues, setValue]);

    const submitTag = (values) => {
        onSubmit({
            name: values.name,
            slug: values.slug,
            description: values.description,
        });
    };

    return (

        <form
            onSubmit={handleSubmit(submitTag)}
            className="space-y-8"
        >

            {/* ==========================================
                Basic Information
            =========================================== */}

            <div className="rounded-2xl bg-white p-8 shadow-sm">

                <h2 className="mb-6 text-xl font-semibold">
                    Basic Information
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {/* Tag Name */}

                    <FormInput
                        label="Tag Name"
                        name="name"
                        placeholder="Enter tag name"
                        register={register}
                        errors={errors}
                        required
                    />

                    {/* Slug */}

                    <FormInput
                        label="Slug"
                        name="slug"
                        placeholder="tag-slug"
                        register={register}
                        errors={errors}
                        required
                    />

                </div>

                <div className="mt-6">

                    {/* Description */}

                    <FormTextarea
                        label="Description"
                        name="description"
                        rows={4}
                        placeholder="Short description about this tag..."
                        register={register}
                        errors={errors}
                    />

                </div>

            </div>

            {/* ==========================================
                Appearance
            =========================================== */}

            <div className="rounded-2xl bg-white p-8 shadow-sm">

                <h2 className="mb-6 text-xl font-semibold">
                    Appearance
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {/* Color */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Tag Color
                        </label>

                        <input
                            type="color"
                            {...register("color")}
                            className="h-14 w-full cursor-pointer rounded-xl border border-gray-300"
                        />

                        {errors.color && (

                            <p className="mt-2 text-sm text-red-500">
                                {errors.color.message}
                            </p>

                        )}

                    </div>

                    {/* Icon */}

                    <FormInput
                        label="Icon (Optional)"
                        name="icon"
                        placeholder="e.g. Code, Globe, Cpu"
                        register={register}
                        errors={errors}
                    />

                </div>

            </div>

            {/* ==========================================
                SEO
            =========================================== */}

            <div className="rounded-2xl bg-white p-8 shadow-sm">

                <h2 className="mb-6 text-xl font-semibold">
                    SEO
                </h2>

                <div className="space-y-6">

                    <FormInput
                        label="Meta Title"
                        name="meta_title"
                        placeholder="SEO title"
                        register={register}
                        errors={errors}
                    />

                    <FormTextarea
                        label="Meta Description"
                        name="meta_description"
                        rows={4}
                        placeholder="SEO description"
                        register={register}
                        errors={errors}
                    />

                    <FormInput
                        label="Meta Keywords"
                        name="meta_keywords"
                        placeholder="react, javascript, frontend"
                        register={register}
                        errors={errors}
                    />

                </div>

            </div>

            {/* Continue in Message 3 */}
                        {/* ==========================================
                Settings
            =========================================== */}

            <div className="rounded-2xl bg-white p-8 shadow-sm">

                <h2 className="mb-6 text-xl font-semibold">
                    Settings
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {/* Active */}

                    <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 cursor-pointer">

                        <input
                            type="checkbox"
                            {...register("is_active")}
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />

                        <div>

                            <p className="font-medium text-gray-800">
                                Active
                            </p>

                            <p className="text-sm text-gray-500">
                                Enable this tag for use on blog posts.
                            </p>

                        </div>

                    </label>

                    {/* Featured */}

                    <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 cursor-pointer">

                        <input
                            type="checkbox"
                            {...register("is_featured")}
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />

                        <div>

                            <p className="font-medium text-gray-800">
                                Featured
                            </p>

                            <p className="text-sm text-gray-500">
                                Highlight this tag throughout the website.
                            </p>

                        </div>

                    </label>

                </div>

            </div>

            {/* ==========================================
                Submit Button
            =========================================== */}

            <div className="flex justify-end">

                <SubmitButton
                    loading={loading}
                    text={
                        mode === "edit"
                            ? "Update Tag"
                            : "Create Tag"
                    }
                    className="min-w-48"
                />

            </div>

        </form>

    );
};

export default TagForm;
