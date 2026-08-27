import Joi from "joi";
import { BLOG_STATUS } from "../../constants/index.js";

export const createBlogSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .required(),

    slug: Joi.string()
        .trim()
        .lowercase()
        .pattern(/^[a-z0-9-]+$/)
        .optional(),

    excerpt: Joi.string()
        .trim()
        .allow("")
        .max(500),

    content: Joi.string()
        .trim()
        .required(),

    featuredImage: Joi.string()
        .trim()
        .allow("")
        .optional(),

    seoTitle: Joi.string()
        .trim()
        .allow("")
        .max(255),

    seoDescription: Joi.string()
        .trim()
        .allow("")
        .max(500),

    status: Joi.string()
        .valid(...Object.values(BLOG_STATUS))
        .default(BLOG_STATUS.DRAFT),

    isFeatured: Joi.boolean()
        .default(false),

    categoryId: Joi.string()
        .required(),

    tagIds: Joi.array()
        .items(Joi.string())
        .single()
        .default([]),

    publishedAt: Joi.date()
        .optional(),
});

export const updateBlogSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(255),

    slug: Joi.string()
        .trim()
        .lowercase()
        .pattern(/^[a-z0-9-]+$/),

    excerpt: Joi.string()
        .trim()
        .allow("")
        .max(500),

    content: Joi.string()
        .trim(),

    featuredImage: Joi.string()
        .trim()
        .allow(""),

    seoTitle: Joi.string()
        .trim()
        .allow("")
        .max(255),

    seoDescription: Joi.string()
        .trim()
        .allow("")
        .max(500),

    status: Joi.string()
        .valid(...Object.values(BLOG_STATUS)),

    isFeatured: Joi.boolean(),

    categoryId: Joi.string(),

    tagIds: Joi.array()
        .items(Joi.string())
        .single(),

    publishedAt: Joi.date(),
});

export const idParam = Joi.object({
    id: Joi.string().required(),
});

export const slugParam = Joi.object({
    slug: Joi.string().required(),
});

export const listBlogs = Joi.object({
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
        .allow("")
        .default(""),

    status: Joi.string()
        .valid(...Object.values(BLOG_STATUS))
        .optional(),

    categoryId: Joi.string()
        .optional(),

    authorId: Joi.string()
        .optional(),

    tagId: Joi.string()
        .optional(),

    isFeatured: Joi.boolean()
        .optional(),

    sortBy: Joi.string()
        .valid(
            "title",
            "createdAt",
            "updatedAt",
            "publishedAt",
            "viewCount"
        )
        .default("createdAt"),

    sortOrder: Joi.string()
        .valid("asc", "desc")
        .default("desc"),
});
