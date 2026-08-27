// backend/src/models/auth/auth.validation.js

import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export const registerSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address"),

    phone: z
        .string()
        .trim()
        .regex(
            /^(98|97)\d{8}$/,
            "Please enter a valid mobile number"
        ),

    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must be at most 50 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "First name can only contain letters"
        ),

    lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must be at most 50 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Last name can only contain letters"
        ),

    gender: z.enum(
        ["MALE", "FEMALE", "OTHER"],
        {
            message: "Please select a valid gender",
        }
    ),

    position: z
        .string()
        .trim()
        .max(30, "Position must be at most 30 characters")
        .regex(
            /^[a-zA-Z\s'-]*$/,
            "Position can only contain letters"
        )
        .nullable()
        .optional(),

    profileImage: z
        .any()
        .optional(),

    facebookUsername: z
        .string()
        .trim()
        .max(
            50,
            "Facebook username cannot exceed 50 characters"
        )
        .regex(
            /^[a-zA-Z0-9._]*$/,
            "Only letters, numbers, periods and underscores are allowed"
        )
        .nullable()
        .optional(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),

    bio: z
        .string()
        .trim()
        .max(
            500,
            "Bio must be at most 500 characters"
        )
        .nullable()
        .optional(),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords must match",
        path: ["confirmPassword"],
    }
);


/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required"),
});


/*
|--------------------------------------------------------------------------
| Refresh Token
|--------------------------------------------------------------------------
*/

export const refreshTokenSchema = z.object({
    refreshToken: z
        .string()
        .min(1, "Refresh token is required"),
});


/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
*/

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address"),
});


/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/

export const resetPasswordSchema = z.object({
    token: z
        .string()
        .min(1, "Reset token is required"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
});