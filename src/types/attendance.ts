import { z } from "zod";
import {
  AttendanceSchema,
  MarkAttendanceSchema,
} from "../schemas/attendance.schema";

export type Attendance = z.infer<typeof AttendanceSchema>;

export type MarkAttendance = z.infer<typeof MarkAttendanceSchema>;
