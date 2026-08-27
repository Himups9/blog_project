import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(5).max(255),

  slug: z.string().optional(),

  excerpt: z.string().optional(),

  content: z.string().min(20),

  featuredImage: z.string().optional(),

  seoTitle: z.string().optional(),

  seoDescription: z.string().optional(),

  categoryId: z.string(),

  status: z
    .enum([
      "DRAFT",
      "PUBLISHED",
      "ARCHIVED",
    ])
    .optional(),
});