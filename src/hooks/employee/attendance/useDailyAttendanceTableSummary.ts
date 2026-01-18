import { useDailyAttendance } from "./useAttendance";
import { useEmployees } from "../employeeDetails/useEmployess";

export const useDailyAttendanceTableSummary = (
  date: string,
  searchQuery: string
) => {
  const { data: employees } = useEmployees();
  const { data: attendanceRecords } = useDailyAttendance(date);

  const dailyAttendance =
    attendanceRecords?.map((record) => {
      const employee = employees?.find((emp) => emp.id === record.empId);
      return {
        ...record,
        employeeName: employee
          ? `${employee.empFirstName} ${employee.empLastName}`
          : null,
      };
    }) || [];

  const filteredAttendance = dailyAttendance.filter((record) => {
    const employeeName = record.employeeName
      ? record.employeeName.toLowerCase()
      : "";
    return employeeName.includes(searchQuery.toLowerCase());
  });

  return {
    dailyAttendance: filteredAttendance,
  };
};
