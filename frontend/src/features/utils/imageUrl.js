const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:5001/api";

export const SERVER_BASE_URL =
    API_BASE_URL.replace(/\/api\/?$/, "");

export const getImageUrl = (imagePath) => {
    if (!imagePath) {
        return null;
    }

    const value = String(imagePath).trim();

    if (!value) {
        return null;
    }

    // Already a complete URL
    if (
        value.startsWith("http://") ||
        value.startsWith("https://") ||
        value.startsWith("data:")
    ) {
        return value;
    }

    // Normalize Windows/backslashes
    let path = value.replace(/\\/g, "/");

    // Remove leading /
    path = path.replace(/^\/+/, "");

    // Already contains uploads/
    if (path.startsWith("uploads/")) {
        return `${SERVER_BASE_URL}/${path}`;
    }

    // Normal relative upload path
    return `${SERVER_BASE_URL}/uploads/${path}`;
};
