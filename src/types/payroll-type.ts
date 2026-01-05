import { z } from "zod";
import {payrollRecordResponseSchema, payRollResponseSchema,epfFormSchema,etfFormSchema} from "../schemas/payroll.schema";

export type PayRollResponseType = z.infer<typeof payRollResponseSchema>;
export type PayrollRecordResponseType = z.infer<typeof payrollRecordResponseSchema>;

export type EPFFormType = z.infer<typeof epfFormSchema> & {id:string};
export type ETFFormType = z.infer<typeof etfFormSchema> & {id:string};