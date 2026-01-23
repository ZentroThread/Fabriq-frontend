import { z } from "zod";
import { AttendanceSchema } from "../schemas/attendance.schema";

export type Attendance = z.infer<typeof AttendanceSchema>;
