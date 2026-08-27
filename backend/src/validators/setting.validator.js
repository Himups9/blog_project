import { z } from "zod";

export const settingSchema = z.object({
  siteName: z.string().min(2),

  siteDescription: z.string().optional(),

  email: z.string().email().optional(),

  phone: z.string().optional(),

  address: z.string().optional(),

  facebook: z.string().optional(),

  instagram: z.string().optional(),

  youtube: z.string().optional(),

  twitter: z.string().optional(),

  linkedin: z.string().optional(),

  footerText: z.string().optional(),

  seoTitle: z.string().optional(),

  seoDescription: z.string().optional(),

  seoKeywords: z.string().optional(),
});