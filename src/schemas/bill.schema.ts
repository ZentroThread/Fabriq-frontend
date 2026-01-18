import { z } from "zod";

export const BillSchema = z.object({
  billingId: z.number().optional(),
  billingCode: z.string().optional(),
  billingTotal: z.string().optional(),
  billingStatus: z.string().optional(),
  billingType: z.string().optional(),
  billingDate: z.string().optional(),
  custCode: z.string().optional(),
});
