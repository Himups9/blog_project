import * as yup from "yup";

export const tagSchema = yup.object({

    /*
    |--------------------------------------------------------------------------
    | Basic Information
    |--------------------------------------------------------------------------
    */

    name: yup
        .string()
        .trim()
        .min(2, "Tag name must be at least 2 characters.")
        .max(100, "Tag name cannot exceed 100 characters.")
        .required("Tag name is required."),

    slug: yup
        .string()
        .trim()
        .matches(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug may contain only lowercase letters, numbers and hyphens."
        )
        .required("Slug is required."),

    description: yup
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters.")
        .nullable(),

    /*
    |--------------------------------------------------------------------------
    | Appearance
    |--------------------------------------------------------------------------
    */

    color: yup
        .string()
        .required("Tag color is required.")
        .matches(
            /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            "Please select a valid color."
        ),

    icon: yup
        .string()
        .trim()
        .max(50, "Icon name cannot exceed 50 characters.")
        .nullable(),

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
    | Settings
    |--------------------------------------------------------------------------
    */

    is_active: yup
        .boolean()
        .default(true),

    is_featured: yup
        .boolean()
        .default(false),

});