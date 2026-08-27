import * as yup from "yup";

export const blogSchema = yup.object({
    /*
    |--------------------------------------------------------------------------
    | Basic Information
    |--------------------------------------------------------------------------
    */

    title: yup
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters.")
        .max(200, "Title cannot exceed 200 characters.")
        .required("Blog title is required."),

    slug: yup
        .string()
        .trim()
        .matches(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug may contain only lowercase letters, numbers, and hyphens."
        )
        .required("Slug is required."),

    excerpt: yup
        .string()
        .trim()
        .max(500, "Excerpt cannot exceed 500 characters.")
        .required("Excerpt is required."),

    /*
    |--------------------------------------------------------------------------
    | Content
    |--------------------------------------------------------------------------
    */

    content: yup
        .string()
        .trim()
        .required("Blog content is required.")
        .min(100, "Content should contain at least 100 characters."),

    /*
    |--------------------------------------------------------------------------
    | Media
    |--------------------------------------------------------------------------
    */

    featured_image: yup
        .mixed()
        .nullable()
        .test(
            "fileSize",
            "Image must be smaller than 5 MB.",
            (value) => {
                if (!value) return true;

                if (typeof value === "string") return true;

                return value.size <= 5 * 1024 * 1024;
            }
        )
        .test(
            "fileType",
            "Only JPG, JPEG, PNG and WEBP images are allowed.",
            (value) => {
                if (!value) return true;

                if (typeof value === "string") return true;

                return [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp",
                ].includes(value.type);
            }
        ),

    /*
    |--------------------------------------------------------------------------
    | Organization
    |--------------------------------------------------------------------------
    */

    category: yup
        .mixed()
        .required("Please select a category."),

    tags: yup
        .array()
        .of(yup.string())
        .default([]),

    status: yup
        .string()
        .oneOf(
            ["draft", "published"],
            "Invalid blog status."
        )
        .required("Status is required."),

    /*
    |--------------------------------------------------------------------------
    | SEO
    |--------------------------------------------------------------------------
    */

    meta_title: yup
        .string()
        .trim()
        .max(60, "Meta title cannot exceed 60 characters.")
        .nullable(),

    meta_description: yup
        .string()
        .trim()
        .max(160, "Meta description cannot exceed 160 characters.")
        .nullable(),

    meta_keywords: yup
        .string()
        .trim()
        .max(255, "Meta keywords cannot exceed 255 characters.")
        .nullable(),

    /*
    |--------------------------------------------------------------------------
    | Publishing
    |--------------------------------------------------------------------------
    */

    featured: yup
        .boolean()
        .default(false),

    allow_comments: yup
        .boolean()
        .default(true),

    publish_date: yup
        .date()
        .nullable()
        .typeError("Please select a valid publish date."),

    visibility: yup
        .string()
        .oneOf(
            ["public", "private", "members"],
            "Invalid visibility option."
        )
        .required("Visibility is required."),
});
