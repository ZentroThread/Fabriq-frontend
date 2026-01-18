import { useTodayDeviceAttendanceLogs } from "./useDeviceAttendence";
import { useEmployees } from "../employeeDetails/useEmployess";

export default function useTodayDeviceAttendanceLogsSummary() {
  const { data: todayLogs, isLoading } = useTodayDeviceAttendanceLogs();
  const { data: employees } = useEmployees();

  const totalEmployees = employees ? employees.length : 0;
  const presentCount = todayLogs
    ? todayLogs.filter((log) => log.direction === "IN").length
    : 0;

  const lateCount = todayLogs
    ? todayLogs.filter((log) => {
        if (log.direction === "IN") {
          const logTime = new Date(log.punchTime);
          const lateThreshold = new Date(logTime);
          lateThreshold.setHours(9, 0, 0, 0);
          return logTime > lateThreshold;
        }
        return false;
      }).length
    : 0;
  const absentCount = totalEmployees - (presentCount + lateCount);

  const todayAttendanceWithEmpName =
    todayLogs?.map((log) => {
      const employee = employees?.find((emp) => emp.empCode === log.empCode);
      return {
        ...log,
        employeeName: employee
          ? `${employee.empFirstName} ${employee.empLastName}`
          : null,
      };
    }) || [];

  return {
    totalEmployees,
    presentCount,
    lateCount,
    absentCount,
    todayAttendanceWithEmpName,
    isLoading,
  };
}
