// ============================================================
// Gallery Constants
// ============================================================

export const GALLERY_CONSTANTS = {
    // --------------------------------------------------------
    // Pagination
    // --------------------------------------------------------

    DEFAULT_PAGE: 1,

    DEFAULT_LIMIT: 20,

    MAX_LIMIT: 100,

    // --------------------------------------------------------
    // Image Upload
    // --------------------------------------------------------

    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5 MB

    ALLOWED_IMAGE_TYPES: [
        "image/jpeg",
        "image/png",
        "image/webp",
    ],

    ALLOWED_IMAGE_EXTENSIONS: [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
    ],

    // --------------------------------------------------------
    // Image Optimization
    // --------------------------------------------------------

    OPTIMIZED_WIDTH: 1200,

    OPTIMIZED_QUALITY: 80,

    THUMBNAIL_WIDTH: 400,

    THUMBNAIL_HEIGHT: 300,

    THUMBNAIL_QUALITY: 75,

    // --------------------------------------------------------
    // Validation
    // --------------------------------------------------------

    MAX_TITLE_LENGTH: 255,

    MAX_ALT_TEXT_LENGTH: 255,

    // --------------------------------------------------------
    // Messages
    // --------------------------------------------------------

    MESSAGES: {
        CREATE_SUCCESS:
            "Gallery item created successfully.",

        UPDATE_SUCCESS:
            "Gallery item updated successfully.",

        DELETE_SUCCESS:
            "Gallery item deleted successfully.",

        DELETE_CONFIRM:
            "Are you sure you want to delete this gallery item?",

        LOAD_ERROR:
            "Failed to load gallery items.",

        CREATE_ERROR:
            "Failed to create gallery item.",

        UPDATE_ERROR:
            "Failed to update gallery item.",

        DELETE_ERROR:
            "Failed to delete gallery item.",

        IMAGE_REQUIRED:
            "Please select an image.",

        INVALID_IMAGE_TYPE:
            "Only JPG, PNG, and WebP images are allowed.",

        IMAGE_TOO_LARGE:
            "Image must not exceed 5 MB.",
    },
};

export default GALLERY_CONSTANTS;