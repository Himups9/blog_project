import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2)
    .max(50),

  lastName: z
    .string()
    .trim()
    .min(2)
    .max(50),

  email: z
    .string()
    .trim()
    .email(),

  password: z
    .string()
    .min(8)
    .max(100),

  phone: z
    .string()
    .optional(),

  profileImage: z
    .string()
    .optional(),

  bio: z
    .string()
    .optional(),

  facebookUsername: z
    .string()
    .optional(),

  gender: z
    .enum(["MALE", "FEMALE", "OTHER"])
    .optional(),

  dateOfBirth: z
    .string()
    .optional(),

  position: z
    .string()
    .optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(8),
});