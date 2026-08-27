import { z } from "zod";

/*
|--------------------------------------------------------------------------
| User ID
|--------------------------------------------------------------------------
*/

export const userIdSchema = z.object({
    id: z
        .string()
        .min(1, "User ID is required."),
});


/*
|--------------------------------------------------------------------------
| User Query
|--------------------------------------------------------------------------
|
| GET /api/users?page=1&limit=10&search=
|
*/

export const userQuerySchema = z.object({

    page: z.coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(10),

    search: z
        .string()
        .trim()
        .default(""),

    ordering: z
        .string()
        .optional()
        .default("-createdAt"),

});


/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

export const updateProfileSchema = z.object({

    firstName: z
        .string()
        .trim()
        .min(1, "First name is required.")
        .optional(),

    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required.")
        .optional(),

    phone: z
        .string()
        .trim()
        .optional(),

    bio: z
        .string()
        .trim()
        .optional(),

    facebookUsername: z
        .string()
        .trim()
        .optional(),

    gender: z
        .string()
        .optional(),

    dateOfBirth: z
        .string()
        .optional(),

    position: z
        .string()
        .trim()
        .optional(),

});


/*
|--------------------------------------------------------------------------
| Update User (Admin)
|--------------------------------------------------------------------------
*/

export const updateUserSchema = z.object({

    firstName: z
        .string()
        .trim()
        .min(1, "First name is required.")
        .optional(),

    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required.")
        .optional(),

    email: z
        .email("Invalid email address.")
        .optional(),

    phone: z
        .string()
        .trim()
        .optional(),

    gender: z
        .string()
        .optional(),

    facebookUsername: z
        .string()
        .trim()
        .optional(),

    role: z
        .string()
        .optional(),

    /*
     * FormData sends these as strings.
     *
     * "true"  -> true
     * "false" -> false
     */
    isActive: z
        .union([
            z.boolean(),
            z.string().transform(
                (value) => value === "true"
            ),
        ])
        .optional(),

    isVerified: z
        .union([
            z.boolean(),
            z.string().transform(
                (value) => value === "true"
            ),
        ])
        .optional(),

    bio: z
        .string()
        .trim()
        .optional(),

    position: z
        .string()
        .trim()
        .optional(),

});
