import { z } from "zod";
import {payRollResponseSchema} from "../schemas/payroll.schema";

export type PayRollResponseType = z.infer<typeof payRollResponseSchema>;