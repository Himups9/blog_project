import { z } from "zod";

export const gallerySchema = z.object({
  title: z.string().min(2),

  altText: z.string().optional(),
});