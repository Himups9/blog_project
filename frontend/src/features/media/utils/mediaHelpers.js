/**
 * ==========================================
 * Format File Size
 * ==========================================
 */

export const formatFileSize = (bytes) => {

    if (!bytes || bytes <= 0) {

        return "0 B";

    }

    const units = [
        "B",
        "KB",
        "MB",
        "GB",
        "TB",
    ];

    let size = bytes;

    let unitIndex = 0;

    while (
        size >= 1024 &&
        unitIndex < units.length - 1
    ) {

        size /= 1024;

        unitIndex++;

    }

    return `${size.toFixed(
        unitIndex === 0 ? 0 : 2
    )} ${units[unitIndex]}`;

};

/**
 * ==========================================
 * Format Date
 * ==========================================
 */

export const formatDate = (
    date,
    locale = "en-US"
) => {

    if (!date) {

        return "-";

    }

    return new Date(date).toLocaleDateString(
        locale,
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    );

};

/**
 * ==========================================
 * Format Date & Time
 * ==========================================
 */

export const formatDateTime = (
    date,
    locale = "en-US"
) => {

    if (!date) {

        return "-";

    }

    return new Date(date).toLocaleString(
        locale,
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );

};

/**
 * ==========================================
 * Get File Extension
 * ==========================================
 */

export const getFileExtension = (
    filename
) => {

    if (!filename) {

        return "";

    }

    return filename
        .split(".")
        .pop()
        .toLowerCase();

};

/**
 * ==========================================
 * Get File Type
 * ==========================================
 */

export const getFileType = (
    mimeType
) => {

    if (!mimeType) {

        return "unknown";

    }

    if (mimeType.startsWith("image/")) {

        return "image";

    }

    if (mimeType.startsWith("video/")) {

        return "video";

    }

    if (mimeType.startsWith("audio/")) {

        return "audio";

    }

    if (
        mimeType.includes("pdf") ||
        mimeType.includes("document") ||
        mimeType.includes("text")
    ) {

        return "document";

    }

    return "other";

};

/**
 * ==========================================
 * Check Image
 * ==========================================
 */

export const isImage = (
    mimeType
) => {

    return mimeType?.startsWith(
        "image/"
    );

};

/**
 * ==========================================
 * Generate Image Preview
 * ==========================================
 */

export const createPreviewURL = (
    file
) => {

    if (!file) {

        return null;

    }

    return URL.createObjectURL(file);

};

/**
 * ==========================================
 * Revoke Preview URL
 * ==========================================
 */

export const revokePreviewURL = (
    previewUrl
) => {

    if (previewUrl) {

        URL.revokeObjectURL(
            previewUrl
        );

    }

};

/**
 * ==========================================
 * Validate File Size
 * ==========================================
 */

export const validateFileSize = (
    file,
    maxSizeMB = 10
) => {

    if (!file) {

        return false;

    }

    const maxBytes =
        maxSizeMB *
        1024 *
        1024;

    return file.size <= maxBytes;

};

/**
 * ==========================================
 * Validate File Type
 * ==========================================
 */

export const validateFileType = (
    file,
    allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/svg+xml",
    ]
) => {

    if (!file) {

        return false;

    }

    return allowedTypes.includes(
        file.type
    );

};

/**
 * ==========================================
 * Format Image Dimensions
 * ==========================================
 */

export const formatDimensions = (
    width,
    height
) => {

    if (!width || !height) {

        return "-";

    }

    return `${width} × ${height}`;

};

/**
 * ==========================================
 * Download File
 * ==========================================
 */

export const downloadFile = (
    url,
    filename
) => {

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        filename || "";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

};