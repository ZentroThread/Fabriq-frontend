import { z } from "zod";
import {payrollRecordResponseSchema, payRollResponseSchema} from "../schemas/payroll.schema";

export type PayRollResponseType = z.infer<typeof payRollResponseSchema>;
export type PayrollRecordResponseType = z.infer<typeof payrollRecordResponseSchema>;