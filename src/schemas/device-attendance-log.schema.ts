import { z } from "zod";
import { AttendanceDirection } from "../enum/enums";

export const DeviceAttendanceLogSchema = z.object({
  id: z.number().int().positive(),
  empCode: z.string().min(1),
  punchTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  direction: AttendanceDirection,
});
