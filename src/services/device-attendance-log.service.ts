import { apiClient } from "@/lib/client";
import type { DeviceAttendanceLog } from "@/types/device-attendance-log.type";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { DeviceAttendanceLogSchema } from "@/schemas/device-attendance-log.schema";
export const DeviceAttendanceLogService = {
  
  async fetchTodayLogs(): Promise<DeviceAttendanceLog[]> {
    const response = await apiClient.request<DeviceAttendanceLog[]>(API_ENDPOINTS.DEVICE_ATTENDANCE_LOG.GET_TODAY_LOGS, 
    {method: "GET"});
    return response.map(item => DeviceAttendanceLogSchema.parse(item));
  }

};