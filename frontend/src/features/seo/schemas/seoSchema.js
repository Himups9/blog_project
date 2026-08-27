import * as yup from "yup";

// ======================================================
// Regular Expressions
// ======================================================

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const urlRegex =
    /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/i;

// ======================================================
// Main SEO Schema
// ======================================================

export const seoSchema = yup.object({

    title: yup
        .string()
        .trim()
        .required("SEO title is required.")
        .min(30, "SEO title should be at least 30 characters.")
        .max(60, "SEO title should not exceed 60 characters."),

    slug: yup
        .string()
        .trim()
        .required("Slug is required.")
        .matches(
            slugRegex,
            "Slug may contain only lowercase letters, numbers and hyphens."
        )
        .max(100, "Slug cannot exceed 100 characters."),

    meta_description: yup
        .string()
        .trim()
        .required("Meta description is required.")
        .min(
            120,
            "Meta description should be at least 120 characters."
        )
        .max(
            160,
            "Meta description cannot exceed 160 characters."
        ),

    focus_keyword: yup
        .string()
        .trim()
        .required("Focus keyword is required.")
        .max(100),

    canonical_url: yup
        .string()
        .trim()
        .nullable()
        .test(
            "canonical-url",
            "Please enter a valid URL.",
            (value) => {

                if (!value) {
                    return true;
                }

                return urlRegex.test(value);

            }
        ),

    heading: yup
        .string()
        .trim()
        .nullable(),

    content: yup
        .string()
        .trim()
        .nullable(),

    image_alt_texts: yup
        .array()
        .of(
            yup.string().trim().required()
        )
        .default([]),

    open_graph: yup.object({

        title: yup
            .string()
            .trim()
            .required("Open Graph title is required.")
            .max(60),

        description: yup
            .string()
            .trim()
            .required(
                "Open Graph description is required."
            )
            .max(200),

        image: yup
            .string()
            .trim()
            .nullable()
            .test(
                "og-image",
                "Invalid image URL.",
                (value) => {

                    if (!value) {

                        return true;

                    }

                    return urlRegex.test(value);

                }
            ),

        type: yup
            .string()
            .required(),

    }),

    twitter: yup.object({

        card: yup
            .string()
            .required(),

        title: yup
            .string()
            .trim()
            .required("Twitter title is required.")
            .max(60),

        description: yup
            .string()
            .trim()
            .required(
                "Twitter description is required."
            )
            .max(200),

        image: yup
            .string()
            .trim()
            .nullable()
            .test(
                "twitter-image",
                "Invalid image URL.",
                (value) => {

                    if (!value) {

                        return true;

                    }

                    return urlRegex.test(value);

                }
            ),

    }),

    robots: yup.object({

        robots_index: yup
            .string()
            .oneOf([
                "index",
                "noindex",
            ]),

        robots_follow: yup
            .string()
            .oneOf([
                "follow",
                "nofollow",
            ]),

        noarchive: yup.boolean(),

        nosnippet: yup.boolean(),

        noimageindex: yup.boolean(),

        notranslate: yup.boolean(),

        max_snippet: yup
            .number()
            .integer(),

        max_image_preview: yup
            .string()
            .oneOf([
                "none",
                "standard",
                "large",
            ]),

        max_video_preview: yup
            .number()
            .integer(),

    }),

});