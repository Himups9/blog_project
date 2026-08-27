import * as yup from "yup";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const SUPPORTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
];

export const uploadMediaSchema = yup.object({

    files: yup
        .array()
        .of(
            yup
                .mixed()
                .required("A file is required.")
                .test(
                    "fileSize",
                    "Maximum file size is 10 MB.",
                    (file) => {

                        if (!file) {

                            return false;

                        }

                        return file.size <= MAX_FILE_SIZE;

                    }
                )
                .test(
                    "fileType",
                    "Unsupported file type.",
                    (file) => {

                        if (!file) {

                            return false;

                        }

                        return SUPPORTED_IMAGE_TYPES.includes(
                            file.type
                        );

                    }
                )
        )
        .min(
            1,
            "Please select at least one file."
        )
        .required(),

    alt_text: yup
        .string()
        .trim()
        .max(
            150,
            "Alt text cannot exceed 150 characters."
        ),

    title: yup
        .string()
        .trim()
        .max(
            150,
            "Title cannot exceed 150 characters."
        ),

    caption: yup
        .string()
        .trim()
        .max(
            255,
            "Caption cannot exceed 255 characters."
        ),

    description: yup
        .string()
        .trim()
        .max(
            1000,
            "Description cannot exceed 1000 characters."
        ),

});