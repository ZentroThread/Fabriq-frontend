import { z } from "zod";
import { BillSchema } from "../schemas/bill.schema";

export type Bill = z.infer<typeof BillSchema>;
