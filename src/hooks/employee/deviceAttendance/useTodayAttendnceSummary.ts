import { useTodayDeviceAttendanceLogs } from "./useDeviceAttendence";
import { useEmployees } from "../employeeDetails/useEmployess";

export default function useTodayDeviceAttendanceLogsSummary() {
  const { data: todayLogs = [], isLoading } = useTodayDeviceAttendanceLogs();
  const { data: employees = [] } = useEmployees();

  const totalEmployees = employees.length;

  const inLogs = todayLogs.filter((log) => log.direction === "IN");

  const uniqueInLogs = [
    ...new Map(inLogs.map((log) => [log.empCode, log])).values(),
  ];

  const lateEmployees = uniqueInLogs.filter((log) => {
    const logTime = new Date(log.punchTime);
    const threshold = new Date(logTime);
    threshold.setHours(9, 0, 0, 0);
    return logTime > threshold;
  });

  const lateCount = lateEmployees.length;

  const presentCount = uniqueInLogs.length - lateCount;

  const absentCount = Math.max(
    totalEmployees - uniqueInLogs.length,
    0
  );

  // Attach employee name
  const todayAttendanceWithEmpName = todayLogs.map((log) => {
    const employee = employees.find(
      (emp) => emp.empCode === log.empCode
    );

    return {
      ...log,
      employeeName: employee
        ? `${employee.empFirstName} ${employee.empLastName}`
        : "Unknown Employee",
    };
  });

  return {
    totalEmployees,
    presentCount, 
    lateCount,    
    absentCount,  
    todayAttendanceWithEmpName,
    isLoading,
  };
}
