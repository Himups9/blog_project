// backend/src/models/settings/settings.validation.js

import {
    SETTINGS_LIMITS,
    SETTINGS_ALLOWED_FIELDS,
} from "./settings.constants.js";

/*
|--------------------------------------------------------------------------
| Email Validation
|--------------------------------------------------------------------------
*/

const isValidEmail = (email) => {
    if (!email) {
        return true;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );
};

/*
|--------------------------------------------------------------------------
| URL Validation
|--------------------------------------------------------------------------
*/

const isValidUrl = (value) => {
    if (!value) {
        return true;
    }

    try {
        const url = new URL(value);

        return ["http:", "https:"].includes(
            url.protocol
        );
    } catch {
        return false;
    }
};

/*
|--------------------------------------------------------------------------
| String Length Validation
|--------------------------------------------------------------------------
*/

const validateLength = (
    value,
    fieldName,
    maxLength,
    errors
) => {
    if (
        value !== undefined &&
        value !== null &&
        typeof value === "string" &&
        value.length > maxLength
    ) {
        errors[fieldName] =
            `${fieldName} must not exceed ${maxLength} characters.`;
    }
};

/*
|--------------------------------------------------------------------------
| Settings Validation
|--------------------------------------------------------------------------
*/

/**
 * Validate settings data.
 *
 * @param {Object} data
 * @param {Object} options
 * @param {boolean} options.partial
 *
 * @returns {{
 *   valid: boolean,
 *   errors: Object,
 *   data: Object
 * }}
 */

const validateSettingsData = (
    data = {},
    options = {}
) => {
    const {
        partial = false,
    } = options;

    const errors = {};
    const validatedData = {};

    /*
    |--------------------------------------------------------------------------
    | Validate request body
    |--------------------------------------------------------------------------
    */

    if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data)
    ) {
        return {
            valid: false,
            errors: {
                settings:
                    "Settings data must be a valid object.",
            },
            data: {},
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Reject unknown fields
    |--------------------------------------------------------------------------
    */

    Object.keys(data).forEach((field) => {
        if (
            !SETTINGS_ALLOWED_FIELDS.includes(field)
        ) {
            errors[field] =
                `Unknown settings field: ${field}.`;
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Site Name
    |--------------------------------------------------------------------------
    */

    if (
        !partial ||
        data.siteName !== undefined
    ) {
        const siteName = data.siteName;

        if (
            !siteName ||
            typeof siteName !== "string" ||
            !siteName.trim()
        ) {
            errors.siteName =
                "Site name is required.";
        } else {
            const value = siteName.trim();

            if (
                value.length >
                SETTINGS_LIMITS.siteName
            ) {
                errors.siteName =
                    `Site name must not exceed ${SETTINGS_LIMITS.siteName} characters.`;
            } else {
                validatedData.siteName = value;
            }
        }
    }

    /*
    |--------------------------------------------------------------------------
    | General String Fields
    |--------------------------------------------------------------------------
    */

    const stringFields = [
        "siteDescription",
        "address",
        "seoTitle",
        "seoDescription",
        "seoKeywords",
        "footerText",
    ];

    stringFields.forEach((field) => {
        if (data[field] === undefined) {
            return;
        }

        if (
            data[field] !== null &&
            typeof data[field] !== "string"
        ) {
            errors[field] =
                `${field} must be a string.`;

            return;
        }

        if (data[field] === null) {
            validatedData[field] = null;
            return;
        }

        const value = data[field].trim();

        validateLength(
            value,
            field,
            SETTINGS_LIMITS[field],
            errors
        );

        if (!errors[field]) {
            validatedData[field] = value;
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Email
    |--------------------------------------------------------------------------
    */

    if (data.email !== undefined) {
        if (
            data.email !== null &&
            typeof data.email !== "string"
        ) {
            errors.email =
                "Email must be a string.";
        } else if (
            data.email &&
            !isValidEmail(
                data.email.trim()
            )
        ) {
            errors.email =
                "Please provide a valid email address.";
        } else {
            const value =
                data.email === null
                    ? null
                    : data.email.trim();

            validateLength(
                value,
                "email",
                SETTINGS_LIMITS.email,
                errors
            );

            if (!errors.email) {
                validatedData.email = value;
            }
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Phone
    |--------------------------------------------------------------------------
    */

    if (data.phone !== undefined) {
        if (
            data.phone !== null &&
            typeof data.phone !== "string"
        ) {
            errors.phone =
                "Phone must be a string.";
        } else {
            const value =
                data.phone === null
                    ? null
                    : data.phone.trim();

            validateLength(
                value,
                "phone",
                SETTINGS_LIMITS.phone,
                errors
            );

            if (!errors.phone) {
                validatedData.phone = value;
            }
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Social Media URLs
    |--------------------------------------------------------------------------
    */

    const socialFields = [
        "facebook",
        "instagram",
        "youtube",
        "linkedin",
        "twitter",
    ];

    socialFields.forEach((field) => {
        if (data[field] === undefined) {
            return;
        }

        if (
            data[field] !== null &&
            typeof data[field] !== "string"
        ) {
            errors[field] =
                `${field} must be a string.`;

            return;
        }

        if (data[field] === null) {
            validatedData[field] = null;
            return;
        }

        const value = data[field].trim();

        /*
         * Empty social URL is allowed.
         */
        if (!value) {
            validatedData[field] = "";
            return;
        }

        /*
         * Validate URL.
         */
        if (!isValidUrl(value)) {
            errors[field] =
                `${field} must be a valid URL.`;

            return;
        }

        validateLength(
            value,
            field,
            SETTINGS_LIMITS[field],
            errors
        );

        if (!errors[field]) {
            validatedData[field] = value;
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Logo
    |--------------------------------------------------------------------------
    */

    if (data.logo !== undefined) {
        if (
            data.logo !== null &&
            typeof data.logo !== "string"
        ) {
            errors.logo =
                "Logo must be a string or null.";
        } else {
            validatedData.logo = data.logo;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Favicon
    |--------------------------------------------------------------------------
    */

    if (data.favicon !== undefined) {
        if (
            data.favicon !== null &&
            typeof data.favicon !== "string"
        ) {
            errors.favicon =
                "Favicon must be a string or null.";
        } else {
            validatedData.favicon =
                data.favicon;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Validation Result
    |--------------------------------------------------------------------------
    */

    return {
        valid:
            Object.keys(errors).length === 0,

        errors,

        data: validatedData,
    };
};

/*
|--------------------------------------------------------------------------
| Create Validation
|--------------------------------------------------------------------------
*/

const validateCreateSettings = (data) => {
    return validateSettingsData(data, {
        partial: false,
    });
};

/*
|--------------------------------------------------------------------------
| Update Validation
|--------------------------------------------------------------------------
*/

const validateUpdateSettings = (data) => {
    return validateSettingsData(data, {
        partial: true,
    });
};

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

export {
    validateSettingsData,
    validateCreateSettings,
    validateUpdateSettings,
    isValidEmail,
    isValidUrl,
};