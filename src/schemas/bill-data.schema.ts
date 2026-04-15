import { z } from "zod";

export const customerSchema = z.object({
  custName: z.string().optional(),
  custMobileNumber: z.string().optional(),
  custCode: z.string().optional(),
});

export const attireSchema = z.object({
  attireCode: z.string().optional(),
});

export const rentItemSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  attireCode: z.string().optional(),
  attire: attireSchema.optional(),
  rentDuration: z.coerce.number().nullable().optional(),
  rentDate: z.string().nullable().optional(),
  returnDate: z.string().nullable().optional(),
});

export const billingSchema = z.object({
  billingCode: z.string().optional(),
  billingDate: z.string().optional(),
  billingTotal: z.coerce.number().optional(), // Automatically parses to number for UI
  billingType: z.string().optional(),
  customer: customerSchema.optional(),
});
