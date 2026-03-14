import { z } from "zod";

export const AttendanceSchema = z.object({
  empId: z.number().min(1, "Employee ID must be a positive number"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  checkIn: z
    .string()
    .nullable()
    .refine(
      (time) =>
        time === null ||
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(time),
      {
        message: "Invalid time format for check-in",
      }
    ),

  checkOut: z
    .string()
    .nullable()
    .refine(
      (time) =>
        time === null ||
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(time),
      {
        message: "Invalid time format for check-out",
      }
    ),
  totalHours: z.number().min(0, "Total hours must be non-negative"),
  lateMinutes: z.number().min(0, "Late minutes must be non-negative"),
  status: z.enum(["PRESENT", "ABSENT", "LATE", "ON_LEAVE"]),
});

export const MarkAttendanceSchema = z.object({
  UserID: z.string().min(1, "UserID is required"),

  LogDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid datetime format",
  }),

  Direction: z.enum(["IN", "OUT"]),
});


export type Attendance = z.infer<typeof AttendanceSchema>;
export type MarkAttendance = z.infer<typeof MarkAttendanceSchema>;

