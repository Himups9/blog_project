import * as yup from "yup";

/*
|--------------------------------------------------------------------------
| Comment Validation
|--------------------------------------------------------------------------
*/

export const commentSchema = yup.object({

    content: yup
        .string()
        .trim()
        .required("Comment is required.")
        .min(
            3,
            "Comment must contain at least 3 characters."
        )
        .max(
            2000,
            "Comment cannot exceed 2000 characters."
        ),

});

/*
|--------------------------------------------------------------------------
| Reply Validation
|--------------------------------------------------------------------------
*/

export const replySchema = yup.object({

    reply: yup
        .string()
        .trim()
        .required("Reply is required.")
        .min(
            2,
            "Reply must contain at least 2 characters."
        )
        .max(
            2000,
            "Reply cannot exceed 2000 characters."
        ),

});

/*
|--------------------------------------------------------------------------
| Continue in Message 2
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Report Comment Validation
|--------------------------------------------------------------------------
*/

export const reportCommentSchema = yup.object({

    reason: yup
        .string()
        .required("Please select a report reason."),

    description: yup
        .string()
        .trim()
        .max(
            500,
            "Description cannot exceed 500 characters."
        ),

});

/*
|--------------------------------------------------------------------------
| Edit Comment Validation
|--------------------------------------------------------------------------
*/

export const editCommentSchema = yup.object({

    content: yup
        .string()
        .trim()
        .required("Comment is required.")
        .min(
            3,
            "Comment must contain at least 3 characters."
        )
        .max(
            2000,
            "Comment cannot exceed 2000 characters."
        ),

});

/*
|--------------------------------------------------------------------------
| Moderator Note Validation
|--------------------------------------------------------------------------
*/

export const moderatorNoteSchema = yup.object({

    note: yup
        .string()
        .trim()
        .required("Moderator note is required.")
        .min(
            5,
            "Moderator note must contain at least 5 characters."
        )
        .max(
            1000,
            "Moderator note cannot exceed 1000 characters."
        ),

});

/*
|--------------------------------------------------------------------------
| Continue in Message 3
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Bulk Action Validation
|--------------------------------------------------------------------------
*/

export const bulkActionSchema = yup.object({

    comment_ids: yup
        .array()
        .of(
            yup.number().required()
        )
        .min(
            1,
            "Please select at least one comment."
        )
        .required(),

    action: yup
        .string()
        .oneOf(
            [
                "approve",
                "reject",
                "pending",
                "spam",
                "restore",
                "delete",
            ],
            "Invalid action selected."
        )
        .required("Action is required."),

});

/*
|--------------------------------------------------------------------------
| Comment Filter Validation
|--------------------------------------------------------------------------
*/

export const commentFilterSchema = yup.object({

    search: yup
        .string()
        .trim()
        .max(
            100,
            "Search keyword cannot exceed 100 characters."
        ),

    status: yup
        .string()
        .oneOf(
            [
                "",
                "pending",
                "approved",
                "rejected",
                "spam",
                "reported",
            ],
            "Invalid comment status."
        ),

    page: yup
        .number()
        .integer()
        .positive()
        .default(1),

    ordering: yup
        .string()
        .oneOf(
            [
                "",
                "created_at",
                "-created_at",
                "updated_at",
                "-updated_at",
            ],
            "Invalid ordering option."
        ),

});

/*
|--------------------------------------------------------------------------
| End of File
|--------------------------------------------------------------------------
*/