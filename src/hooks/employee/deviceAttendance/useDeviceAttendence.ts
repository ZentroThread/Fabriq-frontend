import { useQuery } from "@tanstack/react-query";
import { DeviceAttendanceLogService } from "@/services/device-attendance-log.service";
import { type DeviceAttendanceLog } from "@/types/device-attendance-log.type";

export const useTodayDeviceAttendanceLogs = () => {
  return useQuery<DeviceAttendanceLog[]>({
    queryKey: ["device-attendance-logs", "today"],
    queryFn: () => DeviceAttendanceLogService.fetchTodayLogs(),
  });
};
