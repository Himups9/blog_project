export const GALLERY_CONSTANTS = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5 MB

    ALLOWED_MIME_TYPES: [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
    ],

    ALLOWED_EXTENSIONS: [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
    ],

    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,

    MAX_TITLE_LENGTH: 255,
    MAX_ALT_TEXT_LENGTH: 255,
};