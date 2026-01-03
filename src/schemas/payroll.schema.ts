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

export const payrollRecordResponseSchema = z.object({
  month: z.number(),
  year: z.number(),
  netSalary: z.number(),
  confirmed: z.boolean(),
})

export const epfFormSchema = z.object({
  employeeName: z.string(),
  nic: z.string(),
  epfNumber: z.string(),
  epfSalary: z.number(),
  epfEmployeeContribution: z.number(),
  epfEmployerContribution: z.number(),
  total: z.number(),
});

export const etfFormSchema = z.object({
  employeeName: z.string(),
  nic: z.string(),
  epfNumber: z.string(),
  etfSalary: z.number(),
  etfContribution: z.number(),
});
