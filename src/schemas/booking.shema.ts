import { z } from "zod";

export const BookingSchema = z.object({
  id: z.number().optional(),
  tenantId: z.string(),
  attireId: z.number(),
  startDate: z.string(), // ISO date string
  endDate: z.string(), // ISO date string
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).default("PENDING"),
  customerName: z.string(),
  userEmail: z.string().email(),
  createdAt: z.string().optional(), // ISO date string
});

export type Booking = z.infer<typeof BookingSchema>;

