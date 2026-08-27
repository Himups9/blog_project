import { z } from "zod";

export const commentSchema = z.object({
  blogId: z.string(),

  parentId: z.string().optional(),

  content: z
    .string()
    .min(2),
});

export const commentUpdateSchema = z.object({
  content: z
    .string()
    .trim()
    .min(3),
});
