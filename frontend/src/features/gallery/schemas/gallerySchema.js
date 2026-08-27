import * as yup from "yup";

import { GALLERY_CONSTANTS } from "../constants/galleryConstants";

const {
    MAX_FILE_SIZE,
    ALLOWED_IMAGE_TYPES,
    MAX_TITLE_LENGTH,
    MAX_ALT_TEXT_LENGTH,
} = GALLERY_CONSTANTS;

export const gallerySchema = yup.object({
    // =========================================================
    // Title
    // =========================================================

    title: yup
        .string()
        .trim()
        .required("Title is required.")
        .max(
            MAX_TITLE_LENGTH,
            `Title must not exceed ${MAX_TITLE_LENGTH} characters.`
        ),

    // =========================================================
    // Alt Text
    // =========================================================

    altText: yup
        .string()
        .trim()
        .nullable()
        .transform((value) => {
            return value === "" ? null : value;
        })
        .max(
            MAX_ALT_TEXT_LENGTH,
            `Alt text must not exceed ${MAX_ALT_TEXT_LENGTH} characters.`
        ),

    // =========================================================
    // Image
    // =========================================================

    image: yup
        .mixed()
        .nullable()

        // -----------------------------------------------------
        // File size
        // -----------------------------------------------------

        .test(
            "fileSize",
            "Image must not exceed 5 MB.",
            (file) => {
                if (!file) {
                    return true;
                }

                return (
                    file.size <= MAX_FILE_SIZE
                );
            }
        )

        // -----------------------------------------------------
        // File type
        // -----------------------------------------------------

        .test(
            "fileType",
            "Only JPG, PNG, and WebP images are allowed.",
            (file) => {
                if (!file) {
                    return true;
                }

                return ALLOWED_IMAGE_TYPES.includes(
                    file.type
                );
            }
        ),
});