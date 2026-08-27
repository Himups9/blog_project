import { GALLERY_CONSTANTS } from "./gallery.constants.js";

const {
    MAX_TITLE_LENGTH,
    MAX_ALT_TEXT_LENGTH,
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    MAX_LIMIT,
} = GALLERY_CONSTANTS;

/**
 * Validate gallery creation/update data.
 */
export const validateGalleryData = ({
    title,
    altText,
} = {}) => {
    const errors = {};

    /*
     * Title validation
     */
    if (title !== undefined) {
        if (
            typeof title !== "string" ||
            !title.trim()
        ) {
            errors.title =
                "Title is required.";
        } else if (
            title.trim().length >
            MAX_TITLE_LENGTH
        ) {
            errors.title =
                `Title must not exceed ${MAX_TITLE_LENGTH} characters.`;
        }
    }

    /*
     * Alt text validation
     */
    if (
        altText !== undefined &&
        altText !== null
    ) {
        if (
            typeof altText !== "string"
        ) {
            errors.altText =
                "Alt text must be a string.";
        } else if (
            altText.trim().length >
            MAX_ALT_TEXT_LENGTH
        ) {
            errors.altText =
                `Alt text must not exceed ${MAX_ALT_TEXT_LENGTH} characters.`;
        }
    }

    return {
        isValid:
            Object.keys(errors).length === 0,

        errors,
    };
};

/**
 * Validate pagination parameters.
 */
export const validateGalleryPagination = ({
    page,
    limit,
} = {}) => {
    const errors = {};

    const parsedPage =
        page === undefined ||
        page === ""
            ? DEFAULT_PAGE
            : Number(page);

    const parsedLimit =
        limit === undefined ||
        limit === ""
            ? DEFAULT_LIMIT
            : Number(limit);

    /*
     * Page validation
     */
    if (
        !Number.isInteger(parsedPage) ||
        parsedPage < 1
    ) {
        errors.page =
            "Page must be a positive integer.";
    }

    /*
     * Limit validation
     */
    if (
        !Number.isInteger(parsedLimit) ||
        parsedLimit < 1 ||
        parsedLimit > MAX_LIMIT
    ) {
        errors.limit =
            `Limit must be between 1 and ${MAX_LIMIT}.`;
    }

    return {
        isValid:
            Object.keys(errors).length === 0,

        errors,

        page: parsedPage,

        limit: parsedLimit,
    };
};

/**
 * Validate gallery ID.
 */
export const validateGalleryId = (id) => {
    if (
        typeof id !== "string" ||
        !id.trim()
    ) {
        return {
            isValid: false,

            errors: {
                id:
                    "Gallery ID is required.",
            },
        };
    }

    return {
        isValid: true,
        errors: {},
    };
};