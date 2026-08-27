import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().min(2).max(100),

  slug: z.string().optional(),

  description: z.string().optional(),
});