import { useQueries } from "@tanstack/react-query";
import { useEmployees } from "@/hooks/employee/employeeDetails/useEmployess";
import { payrollService } from "@/services/payroll.service";
import { getStartDateFromRange } from "@/utils/date";

type PayrollByRole = {
  role: string;
  totalSalary: number;
  employeeCount: number;
};

export const usePayrollByRole = (range?: string): PayrollByRole[] => {
  const { data: employees } = useEmployees();
  const startDate = getStartDateFromRange(range);

  const payrollQueries = useQueries({
    queries:
      employees?.map(emp => ({
        queryKey: ["payroll", emp.id, startDate.getMonth() + 1, startDate.getFullYear()],
        queryFn: () =>
          payrollService.generatePayroll(
            emp.id,
            startDate.getMonth() + 1,
            startDate.getFullYear()
          ),
        enabled: !!emp.id,
      })) ?? [], 
  });

  if (!employees || employees.length === 0) return [];

  const roleSalaryMap: Record<
    string,
    { totalSalary: number; employeeCount: number }
  > = {};

  payrollQueries.forEach((query, idx) => {
    const payroll = query.data;
    const employee = employees[idx];

    if (!payroll || !employee) return;

    const role = employee.role || "Unknown";
    const totalCompensation =
      (payroll.netSalary || 0) +
      (payroll.epfEmployer || 0) +
      (payroll.etf || 0);

    if (!roleSalaryMap[role]) {
      roleSalaryMap[role] = { totalSalary: 0, employeeCount: 0 };
    }

    roleSalaryMap[role].totalSalary += totalCompensation;
    roleSalaryMap[role].employeeCount += 1;
  });

  return Object.entries(roleSalaryMap).map(([role, data]) => ({
    role,
    totalSalary: data.totalSalary,
    employeeCount: data.employeeCount,
  }));
};
