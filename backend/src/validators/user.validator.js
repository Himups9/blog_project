import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),

  lastName: z.string().min(2).max(50).optional(),

  phone: z.string().optional(),

  bio: z.string().optional(),

  facebookUsername: z.string().optional(),

  position: z.string().optional(),

  isActive: z.boolean().optional(),

  role: z
    .enum([
      "ADMIN",
      "EDITOR",
      "AUTHOR",
      "USER",
    ])
    .optional(),
});