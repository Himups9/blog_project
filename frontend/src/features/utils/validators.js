// frontend/src/utils/validators.js

import * as yup from "yup";


/*
|--------------------------------------------------------------------------
| Common Password Validation
|--------------------------------------------------------------------------
*/

const passwordSchema = yup
    .string()
    .min(
        8,
        "Password must be at least 8 characters"
    )
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required(
        "Password is required"
    );


/*
|--------------------------------------------------------------------------
| Registration Validation
|--------------------------------------------------------------------------
*/

export const registerSchema = yup.object({

    email: yup
        .string()
        .trim()
        .email(
            "Please enter a valid email address"
        )
        .required(
            "Email is required"
        ),

    phone: yup
        .string()
        .trim()
        .required(
            "Mobile number is required"
        )
        .matches(
            /^(98|97)\d{8}$/,
            "Please enter a valid mobile number"
        ),

    firstName: yup
        .string()
        .trim()
        .required(
            "First name is required"
        )
        .min(
            2,
            "First name must be at least 2 characters"
        )
        .max(
            50,
            "First name must be at most 50 characters"
        )
        .matches(
            /^[a-zA-Z\s'-]+$/,
            "First name can only contain letters"
        ),

    lastName: yup
        .string()
        .trim()
        .required(
            "Last name is required"
        )
        .min(
            2,
            "Last name must be at least 2 characters"
        )
        .max(
            50,
            "Last name must be at most 50 characters"
        )
        .matches(
            /^[a-zA-Z\s'-]+$/,
            "Last name can only contain letters"
        ),

    gender: yup
        .string()
        .oneOf(
            ["MALE", "FEMALE", "OTHER"],
            "Please select a valid gender"
        )
        .required(
            "Please select your gender"
        ),

    position: yup
        .string()
        .trim()
        .max(
            100,
            "Position must be at most 100 characters"
        )
        .nullable(),

    profileImage: yup
        .mixed()
        .nullable(),

    facebookUsername: yup
        .string()
        .trim()
        .max(
            50,
            "Facebook username cannot exceed 50 characters"
        )
        .matches(
            /^[a-zA-Z0-9._]*$/,
            "Only letters, numbers, periods and underscores are allowed"
        )
        .nullable(),

    password: passwordSchema,

    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref("password")],
            "Passwords must match"
        )
        .required(
            "Please confirm your password"
        ),

    bio: yup
        .string()
        .trim()
        .max(
            500,
            "Bio must be at most 500 characters"
        )
        .nullable(),
});


/*
|--------------------------------------------------------------------------
| Login Validation
|--------------------------------------------------------------------------
*/

export const loginSchema = yup.object({

    email: yup
        .string()
        .trim()
        .email(
            "Please enter a valid email address"
        )
        .required(
            "Email is required"
        ),

    password: yup
        .string()
        .required(
            "Password is required"
        ),
});


/*
|--------------------------------------------------------------------------
| Profile Update Validation
|--------------------------------------------------------------------------
*/

export const profileSchema = yup.object({

    firstName: yup
        .string()
        .trim()
        .min(
            2,
            "First name must be at least 2 characters"
        )
        .max(
            50,
            "First name must be at most 50 characters"
        )
        .matches(
            /^[a-zA-Z\s'-]+$/,
            "First name can only contain letters"
        ),

    lastName: yup
        .string()
        .trim()
        .min(
            2,
            "Last name must be at least 2 characters"
        )
        .max(
            50,
            "Last name must be at most 50 characters"
        )
        .matches(
            /^[a-zA-Z\s'-]+$/,
            "Last name can only contain letters"
        ),

    bio: yup
        .string()
        .max(
            500,
            "Bio must be at most 500 characters"
        )
        .nullable(),

    dateOfBirth: yup
        .string()
        .nullable()
        .transform(
            (value) =>
                value === "" ? null : value
        ),
});


/*
|--------------------------------------------------------------------------
| Admin Update User Validation
|--------------------------------------------------------------------------
|
| Used by:
|
| Admin Users.jsx
|       ↓
| UserForm.jsx
|       ↓
| userService.updateUser()
|
|--------------------------------------------------------------------------
*/

export const updateUserSchema = yup.object({

    email: yup
        .string()
        .trim()
        .email(
            "Please enter a valid email address"
        )
        .optional(),

    phone: yup
        .string()
        .trim()
        .matches(
            /^(98|97)\d{8}$/,
            "Please enter a valid mobile number"
        )
        .nullable()
        .optional(),

    firstName: yup
        .string()
        .trim()
        .min(
            2,
            "First name must be at least 2 characters"
        )
        .max(
            50,
            "First name must be at most 50 characters"
        )
        .matches(
            /^[a-zA-Z\s'-]+$/,
            "First name can only contain letters"
        )
        .optional(),

    lastName: yup
        .string()
        .trim()
        .min(
            2,
            "Last name must be at least 2 characters"
        )
        .max(
            50,
            "Last name must be at most 50 characters"
        )
        .matches(
            /^[a-zA-Z\s'-]+$/,
            "Last name can only contain letters"
        )
        .optional(),

    gender: yup
        .string()
        .oneOf(
            [
                "MALE",
                "FEMALE",
                "OTHER",
                "",
            ],
            "Please select a valid gender"
        )
        .optional(),

    position: yup
        .string()
        .trim()
        .max(
            100,
            "Position must be at most 100 characters"
        )
        .nullable()
        .optional(),

    facebookUsername: yup
        .string()
        .trim()
        .max(
            50,
            "Facebook username cannot exceed 50 characters"
        )
        .matches(
            /^[a-zA-Z0-9._]*$/,
            "Only letters, numbers, periods and underscores are allowed"
        )
        .nullable()
        .optional(),

    bio: yup
        .string()
        .trim()
        .max(
            500,
            "Bio must be at most 500 characters"
        )
        .nullable()
        .optional(),

    role: yup
        .string()
        .oneOf(
            [
                "ADMIN",
                "EDITOR",
                "AUTHOR",
                "USER",
            ],
            "Invalid user role"
        )
        .optional(),

    /*
    |--------------------------------------------------------------------------
    | Active Status
    |--------------------------------------------------------------------------
    */

    isActive: yup
        .boolean()
        .optional(),

    /*
    |--------------------------------------------------------------------------
    | Verified Status
    |--------------------------------------------------------------------------
    */

    isVerified: yup
        .boolean()
        .optional(),

    /*
    |--------------------------------------------------------------------------
    | Profile Image
    |--------------------------------------------------------------------------
    |
    | React Hook Form gives us a FileList.
    |
    */

    profileImage: yup
        .mixed()
        .nullable()
        .optional(),

    /*
    |--------------------------------------------------------------------------
    | Password
    |--------------------------------------------------------------------------
    |
    | Password is optional when editing an existing user.
    |
    */

    password: yup
        .string()
        .test(
            "password-validation",
            "Password must be at least 8 characters and contain uppercase, lowercase, number and special character",
            (value) => {

                if (!value) {
                    return true;
                }

                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    value
                );
            }
        )
        .optional(),

    /*
    |--------------------------------------------------------------------------
    | Confirm Password
    |--------------------------------------------------------------------------
    */

    confirmPassword: yup
        .string()
        .test(
            "password-match",
            "Passwords must match",
            function (value) {

                const password =
                    this.parent.password;

                if (!password) {
                    return true;
                }

                return value === password;
            }
        )
        .optional(),

});


/*
|--------------------------------------------------------------------------
| Change Password Validation
|--------------------------------------------------------------------------
*/

export const changePasswordSchema = yup.object({

    oldPassword: yup
        .string()
        .required(
            "Current password is required"
        ),

    newPassword: yup
        .string()
        .min(
            8,
            "Password must be at least 8 characters"
        )
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required(
            "New password is required"
        ),

    confirmNewPassword: yup
        .string()
        .oneOf(
            [yup.ref("newPassword")],
            "Passwords must match"
        )
        .required(
            "Please confirm your new password"
        ),
});