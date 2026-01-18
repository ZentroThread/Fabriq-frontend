import Chart from "@/components/templates/Chart";
import { CheckCircle } from "lucide-react";
import useEmployeeStore from "@/store/employee-store";
import { useGetPayrollRecord } from "@/hooks/employee/payroll/usePayroll";
import Button from "@/components/atoms/button/add-button";
import { getMonthAsString, getYearsForRange } from "@/utils/date";
import SectionHeader from "@/components/molecules/header/section-header";
import { useNavigate } from "react-router-dom";
import { SalaryHistorySkeleton } from "@/components/molecules/skeletons/salary-history-skeleton";
import { useState } from "react";

export function SalaryHistory() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const navigator = useNavigate();
  const [year, setYear] = useState(currentYear);
  const { selectedEmployee } = useEmployeeStore();
  const employeeId = selectedEmployee?.id || 0;
  const empName = selectedEmployee?.fullName || "Employee Name";

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsLoading(false), 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value));
  };

  const handleRowClick = (month: string, year: string) => {
    navigator(`/monthly-salary/${employeeId}/${year}/${month}`);
  };

  const handleAddSalary = () => {
    if (currentMonth === 1) {
      navigator(`/monthly-salary/${employeeId}/${year - 1}/12`);
      return;
    }
    navigator(`/monthly-salary/${employeeId}/${year}/${currentMonth - 1}`);
  };

  const {
    data: payrollRecords,
    isLoading,
    isError,
  } = useGetPayrollRecord(Number(employeeId), year);

  const handleDisableBtn = () => {
    if (year < currentYear) {
      return false;
    }
    if (
      payrollRecords?.some(
        (record) => record.month === currentMonth - 1 && record.year === year
      )
    ) {
      return false;
    }
    return true;
  };

  if (isError) {
    return <div>Error loading salary records history.</div>;
  }

  if (isLoading) {
    return <SalaryHistorySkeleton />;
  }

  return (
    <Chart>
      {/* Header */}
      <SectionHeader
        title="Salary History"
        description="View and manage the salary history of the selected employee"
      />

      <div>
        <div className="flex flex-col items-center mb-6 md:flex-row md:items-start md:gap-4 mt-5">
          <div className="w-20 h-20 rounded-full bg-avatar-bg border-2 border-(--color-avatar-border)">
            {selectedEmployee?.imgUrl ? (
              <img
                src={selectedEmployee.imgUrl}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-white">
                {empName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h2 className="mt-4 text-xl font-semibold text-style-white">
              {empName}
            </h2>
            <p className="text-position-text text-sm">role</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start">
          <select
            className="p-2  rounded-lg border border-(--color-border) bg-(--color-card) text-position-text"
            value={year}
            onChange={handleYearChange}
          >
            {getYearsForRange().map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
        <table className="w-full bg-card  border-collapse overflow-hidden shadow-sm mb-5 mt-5">
          {/* Table Head */}
          <thead className="border-b border-(--color-border) text-position-text">
            <tr>
              <th className="text-left py-3 px-4 text-(--color-heading-text) font-semibold">
                Month
              </th>
              <th className="text-left py-3 px-4 text-(--color-heading-text) font-semibold">
                Net Salary
              </th>
              <th className="text-left py-3 px-4 text-(--color-heading-text) font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {payrollRecords?.map((salary, index) => (
              <tr
                key={index}
                className="bg- border-b border-(--color-border) text-position-text hover:bg-main-bg transition"
                onClick={() =>
                  handleRowClick(
                    salary.month.toString(),
                    salary.year.toString()
                  )
                }
              >
                <td className="py-4 px-4 font-extralight  text-(--color-text)">
                  {getMonthAsString(salary.month)}
                </td>
                <td
                  className={`py-4 px-4 ${salary.netSalary ? "font-extralight  text-(--color-heading-text)" : "text-muted-foreground"}`}
                >
                  {salary.netSalary ? salary.netSalary : "--"}
                </td>
                <td className="py-4 px-4">
                  <CheckCircle className="w-5 h-5 text-green-500 text-(--color-text-active)" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {handleDisableBtn() && (
          <Button
            bordercolor="border-border-card3"
            bgcolor="bg-bg-card3"
            textcolor="text-black"
            hoverbg="hover:bg-red"
            hovertext="hover:text-background"
            text="Add Salary Record"
            width="w-full sm:w-50"
            onClick={handleAddSalary}
          />
        )}
      </div>
    </Chart>
  );
}
