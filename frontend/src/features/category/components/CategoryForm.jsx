import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import slugify from "slugify";
import {
    FolderPlus,
    FileText,
    Image as ImageIcon,
    Star,
    GitBranch,
} from "lucide-react";

import { categorySchema } from "../validation/categorySchema";

import FormInput from "../../pages/shared/forms/FormInput";
import FormTextarea from "../../pages/shared/forms/formTextarea";
import SubmitButton from "../../pages/shared/forms/SubmitButton";

import CategoryImageUpload from "./CategoryImageUpload";
import FeaturedImageUpload from "./FeaturedImageUpload";
import ParentCategorySelect from "./ParentCategorySelect";

const CategoryForm = ({
    initialValues = {},
    categories = [],
    onSubmit,
    loading = false,
    mode = "create",
}) => {
    const isEdit = mode === "edit";

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(categorySchema),

        defaultValues: {
            name: initialValues?.name || "",
            slug: initialValues?.slug || "",
            description: initialValues?.description || "",
            image: initialValues?.image || null,
            featuredImage:
                initialValues?.featuredImage || null,
            parentId: initialValues?.parentId || "",
        },
    });

    const name = watch("name");
    const slug = watch("slug");

    const generatedSlug = useRef(
        slugify(initialValues?.name || "", {
            lower: true,
            strict: true,
            trim: true,
        })
    );

    /*
    |--------------------------------------------------------------------------
    | Auto Generate Slug
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!name?.trim()) {
            return;
        }

        const generated = slugify(name, {
            lower: true,
            strict: true,
            trim: true,
        });

        if (
            !slug ||
            slug === generatedSlug.current
        ) {
            setValue("slug", generated, {
                shouldValidate: true,
            });

            generatedSlug.current = generated;
        }
    }, [name, slug, setValue]);

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submitForm = (values) => {
        const categoryName =
            values.name?.trim();

        if (!categoryName) {
            return;
        }

        onSubmit({
            name: categoryName,

            slug:
                values.slug?.trim() ||
                slugify(categoryName, {
                    lower: true,
                    strict: true,
                    trim: true,
                }),

            description:
                values.description?.trim() || "",

            image:
                values.image || null,

            featuredImage:
                values.featuredImage || null,

            parentId:
                values.parentId || null,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className="mx-auto w-full max-w-5xl space-y-6"
        >
            {/* ======================================================
                HEADER
            ======================================================= */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FolderPlus size={24} />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            {isEdit
                                ? "Edit Category"
                                : "Create Category"}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {isEdit
                                ? "Update the category information and media."
                                : "Create a category for organizing your content."}
                        </p>
                    </div>
                </div>
            </div>

            {/* ======================================================
                BASIC INFORMATION
            ======================================================= */}

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <FileText
                            size={20}
                            className="text-blue-600"
                        />

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Basic Information
                            </h2>

                            <p className="text-sm text-gray-500">
                                Define the category name and URL.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 p-6">
                    <FormInput
                        label="Category Name"
                        name="name"
                        placeholder="Technology"
                        register={register}
                        errors={errors}
                        required
                    />

                    <FormInput
                        label="Slug"
                        name="slug"
                        placeholder="technology"
                        register={register}
                        errors={errors}
                        required
                    />

                    <FormTextarea
                        label="Description"
                        name="description"
                        placeholder="Describe this category..."
                        rows={5}
                        register={register}
                        errors={errors}
                    />
                </div>
            </section>

            {/* ======================================================
                CATEGORY STRUCTURE
            ======================================================= */}

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <GitBranch
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Category Structure
                            </h2>

                            <p className="text-sm text-gray-500">
                                Optionally place this category under another category.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <ParentCategorySelect
                        control={control}
                        categories={categories}
                        currentCategoryId={
                            initialValues?.id
                        }
                        error={errors.parentId}
                    />
                </div>
            </section>

            {/* ======================================================
                CATEGORY IMAGE
            ======================================================= */}

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <ImageIcon
                            size={20}
                            className="text-purple-600"
                        />

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Category Image
                            </h2>

                            <p className="text-sm text-gray-500">
                                Main image representing this category.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <CategoryImageUpload
                        control={control}
                        name="image"
                        error={errors.image}
                    />
                </div>
            </section>

            {/* ======================================================
                FEATURED IMAGE
            ======================================================= */}

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <Star
                            size={20}
                            className="text-amber-500"
                        />

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Featured Image
                            </h2>

                            <p className="text-sm text-gray-500">
                                Image used when this category is highlighted.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <FeaturedImageUpload
                        control={control}
                        name="featuredImage"
                        error={errors.featuredImage}
                    />
                </div>
            </section>

            {/* ======================================================
                ACTION
            ======================================================= */}

            <div className="flex justify-end rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <SubmitButton
                    loading={loading}
                    text={
                        isEdit
                            ? "Save Changes"
                            : "Create Category"
                    }
                />
            </div>
        </form>
    );
};

export default CategoryForm;