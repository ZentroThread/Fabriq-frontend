import { z } from "zod";

export const AttendanceStatus = z.enum([
  "PRESENT",
  "ABSENT",
  "LATE",
  "ON_LEAVE",
]);

export const AttendanceDirection = z.enum(["IN", "OUT"]);

export const BookingStatus = z.enum(["PENDING", "APPROVED", "REJECTED"]);

export const DeviceDirection = z.enum(["IN", "OUT"]);

export const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

export const userRoleSchema = z.enum(["owner", "cashier", "sales_assistant"]);

export type AttendanceStatusType = z.infer<typeof AttendanceStatus>;
export type AttendanceDirectionType = z.infer<typeof AttendanceDirection>;
export type BookingStatusType = z.infer<typeof BookingStatus>;
export type DeviceDirectionType = z.infer<typeof DeviceDirection>;
export type GenderType = z.infer<typeof GenderEnum>;
export type UserRole = z.infer<typeof userRoleSchema>;
