import * as yup from "yup";

export const adminUserSchema = yup.object({
    firstName: yup
        .string()
        .trim()
        .required("First name is required.")
        .min(
            2,
            "First name must be at least 2 characters."
        )
        .max(
            30,
            "First name cannot exceed 30 characters."
        )
        .matches(
            /^[A-Za-z\s]+$/,
            "First name can only contain letters."
        ),

    lastName: yup
        .string()
        .trim()
        .required("Last name is required.")
        .min(
            2,
            "Last name must be at least 2 characters."
        )
        .max(
            30,
            "Last name cannot exceed 30 characters."
        )
        .matches(
            /^[A-Za-z\s]+$/,
            "Last name can only contain letters."
        ),

    email: yup
        .string()
        .trim()
        .required("Email address is required.")
        .email(
            "Please enter a valid email address."
        ),

    phone: yup
        .string()
        .nullable()
        .transform(
            (value) => value || ""
        )
        .matches(
            /^(98|97)\d{8}$/,
            {
                message:
                    "Please enter a valid mobile number.",
                excludeEmptyString: true,
            }
        ),

    gender: yup
        .string()
        .oneOf(
            [
                "",
                "MALE",
                "FEMALE",
                "OTHER",
            ],
            "Please select a valid gender."
        ),

    facebookUsername: yup
        .string()
        .trim()
        .nullable()
        .transform(
            (value) => value || ""
        )
        .matches(
            /^[A-Za-z0-9.]{5,50}$/,
            {
                message:
                    "Facebook username may contain only letters, numbers and periods.",
                excludeEmptyString: true,
            }
        ),

    position: yup
        .string()
        .trim()
        .max(
            100,
            "Position cannot exceed 100 characters."
        ),

    role: yup
        .string()
        .oneOf(
            [
                "USER",
                "AUTHOR",
                "EDITOR",
                "ADMIN",
            ],
            "Please select a valid role."
        ),

    bio: yup
        .string()
        .trim()
        .max(
            500,
            "Biography cannot exceed 500 characters."
        ),

    isActive: yup.boolean(),

    isVerified: yup.boolean(),

    profileImage: yup
        .mixed()
        .nullable(),

    removeImage: yup.boolean(),
});