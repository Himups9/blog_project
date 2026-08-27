import * as yup from "yup";

export const categorySchema = yup.object({
    /*
    |--------------------------------------------------------------------------
    | Category Name
    |--------------------------------------------------------------------------
    */

    name: yup
        .string()
        .trim()
        .min(
            2,
            "Category name must be at least 2 characters."
        )
        .max(
            100,
            "Category name cannot exceed 100 characters."
        )
        .required(
            "Category name is required."
        ),

    /*
    |--------------------------------------------------------------------------
    | Slug
    |--------------------------------------------------------------------------
    */

    slug: yup
        .string()
        .trim()
        .required(
            "Category slug is required."
        )
        .matches(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug may contain only lowercase letters, numbers and hyphens."
        )
        .max(
            150,
            "Category slug cannot exceed 150 characters."
        ),

    /*
    |--------------------------------------------------------------------------
    | Description
    |--------------------------------------------------------------------------
    */

    description: yup
        .string()
        .trim()
        .max(
            500,
            "Description cannot exceed 500 characters."
        )
        .nullable()
        .default(""),

    /*
    |--------------------------------------------------------------------------
    | Category Image
    |--------------------------------------------------------------------------
    */

    image: yup
        .mixed()
        .nullable()
        .test(
            "fileSize",
            "Image size must not exceed 5 MB.",
            (value) => {
                if (!value) {
                    return true;
                }

                // Existing image URL during edit
                if (typeof value === "string") {
                    return true;
                }

                // Uploaded file
                if (value instanceof File) {
                    return (
                        value.size <=
                        5 * 1024 * 1024
                    );
                }

                return false;
            }
        )
        .test(
            "fileType",
            "Only JPG, PNG and WEBP images are allowed.",
            (value) => {
                if (!value) {
                    return true;
                }

                // Existing image URL during edit
                if (typeof value === "string") {
                    return true;
                }

                // Uploaded file
                if (value instanceof File) {
                    return [
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                    ].includes(value.type);
                }

                return false;
            }
        ),

    featuredImage: yup
        .mixed()
        .nullable()
        .test(
            "featuredImageSize",
            "Featured image must not exceed 5 MB.",
            (value) => {
                if (!value) return true;

                if (typeof value === "string") {
                    return true;
                }

                return (
                    value.size <=
                    5 * 1024 * 1024
                );
            }
        )
        .test(
            "featuredImageType",
            "Only JPG, JPEG, PNG and WEBP images are allowed.",
            (value) => {
                if (!value) return true;

                if (typeof value === "string") {
                    return true;
                }

                return [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp",
                ].includes(value.type);
            }
        ),
});