import { useMemo } from "react";
import { useEmployees } from "../employeeDetails/useEmployess";
import { getStartDateFromRange } from "@/utils/date";
import { useQueries } from "@tanstack/react-query";
import { payrollService } from "@/services/payroll.service";

export const useTotalSalary = (monthRange?: string) => {
  const { data: employees } = useEmployees();

  const now = new Date();
  const startDate = getStartDateFromRange(monthRange);
  const monthDiff =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth()) +
    1;

  const queries = useQueries({
    queries: employees
      ? employees.flatMap((emp) =>
          Array.from({ length: monthDiff }).map((_, i) => {
            const date = new Date(
              startDate.getFullYear(),
              startDate.getMonth() + i,
              1
            );
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return {
              queryKey: ["payroll", emp.id, month, year],
              queryFn: () =>
                payrollService.generatePayroll(emp.id, month, year),
              enabled: !!emp.id,
            };
          })
        )
      : [],
  });

  const totalSalary = useMemo(() => {
    if (!employees || queries.length === 0) return 0;

    return employees.reduce((total, emp) => {
      let empTotal = 0;

      for (let i = 0; i < monthDiff; i++) {
        const date = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + i,
          1
        );
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const payrollQuery = queries.find(
          (q) =>
            q.data?.empId === emp.id &&
            q.data.month === month &&
            q.data.year === year
        );
        if (!payrollQuery || !payrollQuery.data) continue;

        const payroll = payrollQuery.data;
        empTotal +=
          (payroll.netSalary || 0) +
          (payroll.epfEmployer || 0) +
          (payroll.etf || 0);
      }

      return total + empTotal;
    }, 0);
  }, [employees, queries, monthDiff, startDate]);

  const isLoading = queries.some((q) => q.isLoading);
  const error = queries.find((q) => q.error)?.error;

  return { totalSalary, isLoading, error };
};
