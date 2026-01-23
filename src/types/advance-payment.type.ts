import { z } from "zod";
import {
  AdvancePaymentRequestSchema,
  AdvancePaymentResponseSchema,
} from "@/schemas/advance-payment.schema";

export type AdvancePaymentRequest = z.infer<typeof AdvancePaymentRequestSchema>;
export type AdvancePaymentResponse = z.infer<
  typeof AdvancePaymentResponseSchema
>;
