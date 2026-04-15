import { z } from "zod";
import { BillSchema } from "../schemas/bill.schema";
import type {
  billingSchema,
  customerSchema,
  rentItemSchema,
} from "@/schemas/bill-data.schema";

export type Bill = z.infer<typeof BillSchema>;

export type CustomerType = z.infer<typeof customerSchema>;
export type BillingType = z.infer<typeof billingSchema>;
export type RentItemType = z.infer<typeof rentItemSchema>;
