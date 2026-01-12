import { z } from "zod";
import {DeviceAttendanceLogSchema} from "@/schemas/device-attendance-log.schema";

export type DeviceAttendanceLog = z.infer<typeof DeviceAttendanceLogSchema>;