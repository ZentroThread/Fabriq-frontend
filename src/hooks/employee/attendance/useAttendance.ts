import { useQuery , useMutation} from "@tanstack/react-query";
import { AttendanceService } from "@/services/attendance.service";
import { type Attendance, type MarkAttendance } from "@/types/attendance.ts";

export const useDailyAttendance = (date: string) => {
  return useQuery<Attendance[]>({
    queryKey: ["attendance", date],
    queryFn: () => AttendanceService.fetchDailyAttendance(date),
  });
};

export const useMarkAttendance = () => {
  return useMutation({
    mutationFn: (data: MarkAttendance) => 
      AttendanceService.markAttendance(data),
  });
};

