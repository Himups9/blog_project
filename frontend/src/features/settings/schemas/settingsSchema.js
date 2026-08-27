import * as yup from "yup";

/*
|--------------------------------------------------------------------------
| Common Validators
|--------------------------------------------------------------------------
*/

const urlField = yup
    .string()
    .trim()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .url("Enter a valid URL");

const emailField = yup
    .string()
    .trim()
    .email("Enter a valid email address");

const phoneField = yup
    .string()
    .trim()
    .matches(
        /^[0-9+\-\s()]{7,20}$/,
        "Enter a valid phone number"
    );

/*
|--------------------------------------------------------------------------
| General Settings
|--------------------------------------------------------------------------
*/

export const generalSettingsSchema = yup.object({

    site_name: yup
        .string()
        .trim()
        .required("Site name is required")
        .max(150, "Maximum 150 characters"),

    site_description: yup
        .string()
        .trim()
        .max(500, "Maximum 500 characters"),

});

/*
|--------------------------------------------------------------------------
| Site Information
|--------------------------------------------------------------------------
*/

export const siteInformationSchema = yup.object({

    company_name: yup
        .string()
        .trim()
        .required("Company name is required")
        .max(120),

    website: urlField,

    copyright: yup
        .string()
        .trim()
        .max(200),

    logo: yup.mixed().nullable(),

    favicon: yup.mixed().nullable(),

});

/*
|--------------------------------------------------------------------------
| Contact Settings
|--------------------------------------------------------------------------
*/

export const contactSettingsSchema = yup.object({

    email: emailField.required(
        "Contact email is required"
    ),

    phone: phoneField.required(
        "Phone number is required"
    ),

    address: yup
        .string()
        .trim()
        .required("Address is required")
        .max(255),

    map_url: urlField,

});

/*
|--------------------------------------------------------------------------
| SMTP Settings
|--------------------------------------------------------------------------
*/

export const smtpSettingsSchema = yup.object({

    smtp_host: yup
        .string()
        .required("SMTP host is required"),

    smtp_port: yup
        .number()
        .typeError("Port must be a number")
        .required("SMTP port is required")
        .min(1)
        .max(65535),

    smtp_username: yup
        .string()
        .required("SMTP username is required"),

    smtp_password: yup
        .string()
        .required("SMTP password is required"),

    sender_name: yup
        .string()
        .required("Sender name is required"),

    sender_email: emailField.required(
        "Sender email is required"
    ),

    encryption: yup
        .string()
        .oneOf([
            "none",
            "ssl",
            "tls",
        ])
        .required(),

});

/*
|--------------------------------------------------------------------------
| Social Media
|--------------------------------------------------------------------------
*/

export const socialMediaSchema = yup.object({

    facebook: urlField,

    instagram: urlField,

    twitter: urlField,

    linkedin: urlField,

    youtube: urlField,

    tiktok: urlField,

});

/*
|--------------------------------------------------------------------------
| Theme
|--------------------------------------------------------------------------
*/

export const themeSchema = yup.object({

    primary_color: yup
        .string()
        .matches(
            /^#([A-Fa-f0-9]{6})$/,
            "Invalid HEX color"
        )
        .required(),

    secondary_color: yup
        .string()
        .matches(
            /^#([A-Fa-f0-9]{6})$/,
            "Invalid HEX color"
        )
        .required(),

    accent_color: yup
        .string()
        .matches(
            /^#([A-Fa-f0-9]{6})$/,
            "Invalid HEX color"
        )
        .required(),

    dark_mode: yup.boolean(),

});

/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

export const securitySchema = yup.object({

    minimum_password_length: yup
        .number()
        .required()
        .min(6)
        .max(64),

    password_expiry_days: yup
        .number()
        .required()
        .min(0)
        .max(365),

    maximum_login_attempts: yup
        .number()
        .required()
        .min(1)
        .max(20),

    two_factor_authentication: yup.boolean(),

    force_strong_password: yup.boolean(),

});

/*
|--------------------------------------------------------------------------
| Maintenance
|--------------------------------------------------------------------------
*/

export const maintenanceSchema = yup.object({

    enabled: yup.boolean(),

    maintenance_title: yup
        .string()
        .trim()
        .required("Title is required")
        .max(120),

    maintenance_message: yup
        .string()
        .trim()
        .required("Message is required")
        .max(1000),

    start_datetime: yup
        .string()
        .nullable(),

    end_datetime: yup
        .string()
        .nullable(),

    timezone: yup
        .string()
        .required(),

});

/*
|--------------------------------------------------------------------------
| Search / Activity Filters
|--------------------------------------------------------------------------
*/

export const activityFilterSchema = yup.object({

    search: yup.string(),

    action: yup.string(),

    status: yup.string(),

    user: yup.string(),

    start_date: yup.string(),

    end_date: yup.string(),

});


/*
|--------------------------------------------------------------------------
| Password Policy
|--------------------------------------------------------------------------
*/

export const passwordPolicySchema = yup.object({

    force_strong_password: yup.boolean(),

    enable_two_factor: yup.boolean(),

    password_expiry_days: yup
        .number()
        .typeError("Password expiry must be a number")
        .required("Password expiry is required")
        .min(0)
        .max(365),

    max_login_attempts: yup
        .number()
        .typeError("Maximum login attempts must be a number")
        .required("Maximum login attempts is required")
        .min(1)
        .max(20),

    lockout_duration: yup
        .number()
        .typeError("Lockout duration must be a number")
        .required("Lockout duration is required")
        .min(1)
        .max(1440),

    session_timeout: yup
        .number()
        .typeError("Session timeout must be a number")
        .required("Session timeout is required")
        .min(5)
        .max(1440),

    remember_me: yup.boolean(),

    notify_failed_login: yup.boolean(),

    trusted_devices: yup.boolean(),

    ip_whitelist_enabled: yup.boolean(),

    ip_whitelist: yup.string().when("ip_whitelist_enabled", {
        is: true,
        then: (schema) =>
            schema.required("IP whitelist is required"),
        otherwise: (schema) =>
            schema.nullable(),
    }),

});

/*
|--------------------------------------------------------------------------
| Export All
|--------------------------------------------------------------------------
*/

export const settingsSchemas = {

    generalSettingsSchema,

    siteInformationSchema,

    contactSettingsSchema,

    smtpSettingsSchema,

    socialMediaSchema,

    themeSchema,

    securitySchema,

    maintenanceSchema,

    activityFilterSchema,

    passwordPolicySchema,

};
