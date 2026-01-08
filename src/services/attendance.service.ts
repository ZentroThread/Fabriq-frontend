import { apiClient } from "@/lib/client";
import { API_ENDPOINTS } from "@/constants/api.constants";
import type { Attendance } from "@/types/attendance";
import { AttendanceSchema } from "@/schemas/attendance.schema";

export const AttendanceService = {
  async fetchDailyAttendance(date: string): Promise<Attendance[]> {
    const response = await apiClient.request<Attendance[]>(
      API_ENDPOINTS.ATTENDANCE.GET_DAILY_ATTENDANCE(date),
      { method: "GET" }
    );
    return response.map((item) => AttendanceSchema.parse(item));
  },
};