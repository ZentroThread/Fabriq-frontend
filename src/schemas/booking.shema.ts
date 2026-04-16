import { z } from "zod";
import { BookingStatus } from "../enum/enums";

export const BookingSchema = z.object({
  id: z.number().optional(),
  tenantId: z.string(),
  attireId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  status: BookingStatus.default("PENDING"),
  customerName: z.string(),
  userEmail: z.string().email(),
  createdAt: z.string().optional(),
});

export type Booking = z.infer<typeof BookingSchema>;
