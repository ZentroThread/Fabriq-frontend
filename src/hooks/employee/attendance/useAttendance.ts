import { useQuery } from "@tanstack/react-query";
import { AttendanceService } from "@/services/attendance.service";
import { type Attendance } from "@/types/attendance.ts";

export const useDailyAttendance = (date: string) => {
  return useQuery<Attendance[]>({
    queryKey: ["attendance", date],
    queryFn: () => AttendanceService.fetchDailyAttendance(date),
  });
}