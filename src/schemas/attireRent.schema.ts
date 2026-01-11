import { z } from "zod";

export const AttireRentSchema = z.object({
  id: z.number().optional(),

  rentDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
      "Use format yyyy-MM-ddTHH:mm:ss"
    )
    .optional(),

  returnDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
      "Use format yyyy-MM-ddTHH:mm:ss"
    )
    .optional(),

  rentDuration: z.number().int().min(0).optional(),

  attireCode: z.string().nonempty(),
  custCode: z.string().nonempty(),
  billingCode: z.string().optional(),
});
