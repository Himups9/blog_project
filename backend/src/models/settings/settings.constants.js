// backend/src/models/settings/settings.constants.js

/**
 * Settings module constants
 */

/*
|--------------------------------------------------------------------------
| Default Settings
|--------------------------------------------------------------------------
*/

const SETTINGS_DEFAULTS = {
    siteName: "Himalaya Tech",
    siteDescription: "",

    logo: null,
    favicon: null,

    email: "",
    phone: "",
    address: "",

    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    twitter: "",

    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",

    footerText: "",
};

/*
|--------------------------------------------------------------------------
| Field Length Limits
|--------------------------------------------------------------------------
*/

const SETTINGS_LIMITS = {
    siteName: 150,
    siteDescription: 500,

    email: 254,
    phone: 30,
    address: 500,

    facebook: 255,
    instagram: 255,
    youtube: 255,
    linkedin: 255,
    twitter: 255,

    seoTitle: 255,
    seoDescription: 500,
    seoKeywords: 500,

    footerText: 500,
};

/*
|--------------------------------------------------------------------------
| Allowed Fields
|--------------------------------------------------------------------------
*/

const SETTINGS_ALLOWED_FIELDS =
    Object.keys(SETTINGS_DEFAULTS);

const SETTINGS_UPDATE_FIELDS =
    SETTINGS_ALLOWED_FIELDS;

/*
|--------------------------------------------------------------------------
| Image Upload Configuration
|--------------------------------------------------------------------------
*/

const SETTINGS_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/x-icon",
    "image/vnd.microsoft.icon",
];

/*
|--------------------------------------------------------------------------
| Maximum Image Size
|--------------------------------------------------------------------------
|
| 5 MB
|
*/

const SETTINGS_IMAGE_MAX_SIZE =
    5 * 1024 * 1024;

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

export {
    SETTINGS_DEFAULTS,
    SETTINGS_LIMITS,
    SETTINGS_ALLOWED_FIELDS,
    SETTINGS_UPDATE_FIELDS,
    SETTINGS_IMAGE_MIME_TYPES,
    SETTINGS_IMAGE_MAX_SIZE,
};