// private Integer empId;
//     private String empCode;
//     private String employeeName;

//     private Integer month;
//     private Integer year;

//     private Double basicSalary;
//     private Double totalAllowances;
//     private Double totalDeductions;
//     private Double commission;
//     private Double overtimePay;
//     private Double salaryAdvance;
//     private Double productPay;

//     private Double epfEmployee;
//     private Double epfEmployer;
//     private Double etf;

//     private Double grossSalary;
//     private Double netSalary;

//     private LocalDateTime calculatedAt;
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
  overtimePay: z.number(),
  salaryAdvance: z.number(),
  productPay: z.number(),

  epfEmployee: z.number(),
  epfEmployer: z.number(),
  etf: z.number(),

  grossSalary: z.number(),
  netSalary: z.number(),

  calculatedAt: z.string().nullable(),
});