/**
 * ============================================
 * Settings Helper Functions
 * ============================================
 */

/**
 * Format date
 */
export const formatDate = (
    value,
    locale = "en-US"
) => {

    if (!value) return "-";

    return new Date(value).toLocaleString(locale, {

        year: "numeric",

        month: "short",

        day: "numeric",

        hour: "2-digit",

        minute: "2-digit",

    });

};

/**
 * Format bytes
 */
export const formatBytes = (
    bytes,
    decimals = 2
) => {

    if (!bytes) return "0 Bytes";

    const k = 1024;

    const dm = decimals < 0 ? 0 : decimals;

    const sizes = [

        "Bytes",

        "KB",

        "MB",

        "GB",

        "TB",

    ];

    const i = Math.floor(

        Math.log(bytes) / Math.log(k)

    );

    return `${parseFloat(

        (bytes / Math.pow(k, i)).toFixed(dm)

    )} ${sizes[i]}`;

};

/**
 * Format uptime
 */
export const formatUptime = (seconds) => {

    if (!seconds) return "0m";

    const days = Math.floor(seconds / 86400);

    const hours = Math.floor(
        (seconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (seconds % 3600) / 60
    );

    const result = [];

    if (days) result.push(`${days}d`);

    if (hours) result.push(`${hours}h`);

    if (minutes) result.push(`${minutes}m`);

    return result.join(" ");

};

/**
 * Hex color validator
 */
export const isValidHexColor = (value) => {

    return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(
        value
    );

};

/**
 * Boolean parser
 */
export const parseBoolean = (value) => {

    if (typeof value === "boolean") {

        return value;

    }

    return value === "true" ||
        value === "1";

};

/**
 * Build FormData
 */
export const buildFormData = (data) => {

    const formData = new FormData();

    Object.entries(data).forEach(

        ([key, value]) => {

            if (

                value !== null &&

                value !== undefined

            ) {

                formData.append(key, value);

            }

        }

    );

    return formData;

};

/**
 * Return changed fields only
 */
export const getChangedFields = (
    original,
    updated
) => {

    const changed = {};

    Object.keys(updated).forEach((key) => {

        if (

            original[key] !== updated[key]

        ) {

            changed[key] = updated[key];

        }

    });

    return changed;

};

/**
 * Copy text
 */
export const copyToClipboard = async (
    text
) => {

    try {

        await navigator.clipboard.writeText(
            text
        );

        return true;

    } catch {

        return false;

    }

};

/**
 * Download file
 */
export const downloadFile = (
    url,
    filename
) => {

    const link = document.createElement("a");

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

};

/**
 * Generate random color
 */
export const randomColor = () => {

    return `#${Math.floor(

        Math.random() * 16777215

    ).toString(16).padStart(6, "0")}`;

};

/**
 * Deep clone object
 */
export const deepClone = (value) => {

    return JSON.parse(
        JSON.stringify(value)
    );

};

/**
 * Debounce
 */
export const debounce = (
    callback,
    delay = 500
) => {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

};