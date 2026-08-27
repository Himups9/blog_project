import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInput from "../../pages/shared/forms/FormInput";
import FormTextarea from "../../pages/shared/forms/formTextarea";
import SubmitButton from "../../pages/shared/forms/SubmitButton";

import BlogEditor from "./BlogEditor";
import FeaturedImageUpload from "./FeaturedImageUpload";
import CategorySelect from "./CategorySelect";
import TagInput from "./TagInput";
import BlogStatusSelect from "./BlogStatusSelect";

import { blogSchema } from "../validation/blogSchema";
import { generateSlug } from "../utils/generateSlug";
import { normalizeBlogContentForStorage } from "../utils/contentImages";

const BlogForm = ({
    mode = "create",
    initialData = {},
    categories = [],
    tagOptions = [],
    loadingCategories = false,
    onSubmit,
    loading = false,
}) => {
    const initialCategory =
        initialData.categoryId ||
        initialData.category?.id ||
        initialData.category ||
        "";

    const initialTags =
        initialData.tagIds ||
        initialData.tags?.map((tag) =>
            typeof tag === "string" ? tag : tag.id
        ) ||
        [];

    const initialStatus =
        String(initialData.status || "DRAFT").toLowerCase();

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        trigger,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(blogSchema),
        defaultValues: {
            title: initialData.title || "",
            slug: initialData.slug || "",
            excerpt: initialData.excerpt || "",
            content: initialData.content || "",
            featured_image:
                initialData.featuredImage ||
                initialData.featured_image ||
                null,
            category: initialCategory,
            tags: initialTags,
            status: initialStatus,

            meta_title:
                initialData.meta_title ||
                initialData.seoTitle ||
                "",
            meta_description:
                initialData.meta_description ||
                initialData.seoDescription ||
                "",
            meta_keywords: initialData.meta_keywords || "",

            featured:
                initialData.featured ??
                initialData.isFeatured ??
                false,
            allow_comments:
                initialData.allow_comments ?? true,
            publish_date:
                initialData.publish_date || "",
            visibility:
                initialData.visibility || "public",
        },
    });

    /*
    |--------------------------------------------------------------------------
    | Form State
    |--------------------------------------------------------------------------
    */

    const title = watch("title");
    const slug = watch("slug");
    const content = watch("content");
    const featuredImage = watch("featured_image");
    const category = watch("category");
    const tags = watch("tags");
    const status = watch("status");

    /*
    |--------------------------------------------------------------------------
    | Auto Generate Slug
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (mode === "edit") return;

        if (!title) {
            setValue("slug", "", {
                shouldValidate: false,
            });
            clearErrors("slug");
            return;
        }

        const generatedSlug =
            generateSlug(title);

        if (!generatedSlug) {
            setValue("slug", "", {
                shouldValidate: false,
            });
            clearErrors("slug");
            return;
        }

        setValue(
            "slug",
            generatedSlug,
            {
                shouldValidate: true,
            }
        );
    }, [title, mode, setValue, clearErrors]);

    useEffect(() => {
        if (!slug) {
            clearErrors("slug");
            return;
        }

        trigger("slug");
    }, [slug, clearErrors, trigger]);

    /*
    |--------------------------------------------------------------------------
    | Submit Handler
    |--------------------------------------------------------------------------
    */

    const submitForm = async (data) => {
        if (onSubmit) {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("slug", data.slug);
            formData.append("excerpt", data.excerpt || "");
            formData.append(
                "content",
                normalizeBlogContentForStorage(data.content)
            );
            formData.append("categoryId", data.category);
            formData.append(
                "status",
                String(data.status || "draft").toUpperCase()
            );
            formData.append(
                "isFeatured",
                String(Boolean(data.featured))
            );

            if (data.meta_title) {
                formData.append("seoTitle", data.meta_title);
            }

            if (data.meta_description) {
                formData.append(
                    "seoDescription",
                    data.meta_description
                );
            }

            if (data.featured_image instanceof File) {
                formData.append(
                    "featuredImage",
                    data.featured_image
                );
            }

            (data.tags || []).forEach((tagId) => {
                const id =
                    typeof tagId === "string"
                        ? tagId
                        : tagId?.id;

                if (id) {
                    formData.append("tagIds", id);
                }
            });

            await onSubmit(formData);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-8"
        >

            {/* =====================================================
                Basic Information
                (Continue in Message 2)
            ====================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    Basic Information
                </h2>

                <div className="grid grid-cols-1 gap-6">

                    <FormInput
                        label="Blog Title"
                        name="title"
                        placeholder="Enter blog title"
                        register={register}
                        errors={errors}
                        required
                    />

                    <FormInput
                        label="Slug"
                        name="slug"
                        placeholder="blog-title"
                        register={register}
                        errors={errors}
                        required
                    />

                    <FormTextarea
                        label="Excerpt"
                        name="excerpt"
                        placeholder="Write a short description of your blog..."
                        rows={4}
                        register={register}
                        errors={errors}
                    />

                </div>
            </div>

            {/* =====================================================
                Content
            ====================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    Blog Content
                </h2>

                <BlogEditor
                    value={content}
                    onChange={(value) =>
                        setValue("content", value, {
                            shouldValidate: true,
                        })
                    }
                    error={errors.content?.message}
                />
            </div>

            {/* =====================================================
                Featured Image
            ====================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    Featured Image
                </h2>

                <FeaturedImageUpload
                    value={featuredImage}
                    onChange={(file) =>
                        setValue("featured_image", file, {
                            shouldValidate: true,
                        })
                    }
                    error={errors.featured_image?.message}
                    required
                />
            </div>

            {/* =====================================================
                Organization
            ====================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    Organization
                </h2>

                <CategorySelect
                    value={category}
                    onChange={(value) =>
                        setValue("category", value, {
                            shouldValidate: true,
                        })
                    }
                    categories={categories}
                    loading={loadingCategories}
                    error={errors.category?.message}
                    required
                />

            {/* Continue Message 3 From Here */}

                            <TagInput
                                    value={tags}
                                    options={tagOptions}
                    onChange={(value) =>
                        setValue("tags", value, {
                            shouldValidate: true,
                        })
                    }
                    error={errors.tags?.message}
                />

                <div className="mt-6">
                    <BlogStatusSelect
                        value={status}
                        onChange={(value) =>
                            setValue("status", value, {
                                shouldValidate: true,
                            })
                        }
                        error={errors.status?.message}
                        required
                    />
                </div>
            </div>

            {/* =====================================================
                SEO
            ====================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    SEO Settings
                </h2>

                <div className="grid grid-cols-1 gap-6">

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
                        placeholder="react, django, programming"
                        register={register}
                        errors={errors}
                    />

                </div>
            </div>

            {/* =====================================================
                Publish Settings
            ====================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    Publish Settings
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            {...register("featured")}
                            className="h-4 w-4"
                        />

                        <span>Featured Blog</span>
                    </label>

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            {...register("allow_comments")}
                            className="h-4 w-4"
                        />

                        <span>Allow Comments</span>
                    </label>

                    <FormInput
                        type="datetime-local"
                        label="Publish Date"
                        name="publish_date"
                        register={register}
                        errors={errors}
                    />

                    <div className="space-y-2">

                        <label className="block text-sm font-medium">
                            Visibility
                        </label>

                        <select
                            {...register("visibility")}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="public">
                                Public
                            </option>

                            <option value="private">
                                Private
                            </option>

                            <option value="members">
                                Members Only
                            </option>
                        </select>

                    </div>

                </div>

            </div>

            {/* =====================================================
                Submit Button
            ====================================================== */}

            <div className="flex justify-end border-t pt-6">

                <SubmitButton
                    loading={loading}
                    text={
                        mode === "edit"
                            ? "Update Blog"
                            : "Create Blog"
                    }
                />

            </div>

        </form>
    );
};

export default BlogForm;
