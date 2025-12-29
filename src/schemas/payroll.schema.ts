import { z } from "zod";
export const payRollResponseSchema = z.object({
  empId: z.number(),
  empCode: z.string(),
  employeeName: z.string(),

  month: z.number(),
  year: z.number(),

  basicSalary: z.number(),

  totalAllowances: z.number(),
  totalDeductions: z.number(),
  commission: z.number(),


  doubleOTRate: z.number(),
  doubleOTAmount: z.number(),
  doubleOTHours: z.number(),

  singleOTRate: z.number(),
  singleOTHours: z.number(),
  singleOTAmount: z.number(),

  overtimePay: z.number(),
  extraHolidaysTaken: z.number(),

  salaryAdvance: z.number(),
  productPay: z.number(),

  epfEmployee: z.number(),
  epfEmployer: z.number(),
  etf: z.number(),

  grossSalary: z.number(),
  netSalary: z.number(),

  calculatedAt: z.string().nullable(),
});
