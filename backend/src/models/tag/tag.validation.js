import Joi from "joi";

/**
 * Create Tag
 */
export const createTagValidation = Joi.object({

    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    slug: Joi.string()
        .trim()
        .min(2)
        .max(120)
        .optional()
        .allow(""),

    description: Joi.string()
        .trim()
        .max(500)
        .optional()
        .allow(""),

});


/**
 * Update Tag
 */
export const updateTagValidation = Joi.object({

    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    slug: Joi.string()
        .trim()
        .min(2)
        .max(120)
        .optional()
        .allow(""),

    description: Joi.string()
        .trim()
        .max(500)
        .optional()
        .allow(""),

}).min(1);


/**
 * Tag ID
 */
export const tagIdValidation = Joi.object({

    id: Joi.string()
        .required(),

});


/**
 * Tag Slug
 */
export const tagSlugValidation = Joi.object({

    slug: Joi.string()
        .trim()
        .required(),

});


/**
 * Tag List Query
 */
export const tagListValidation = Joi.object({

    page: Joi.number()
        .integer()
        .min(1)
        .default(1),

    limit: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(10),

    search: Joi.string()
        .trim()
        .allow("")
        .default(""),

    sortBy: Joi.string()
        .valid(
            "name",
            "createdAt",
            "updatedAt"
        )
        .default("createdAt"),

    sortOrder: Joi.string()
        .valid("asc", "desc")
        .default("desc"),

});