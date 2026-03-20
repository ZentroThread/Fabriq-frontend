import { z } from "zod";

export const BookingSchema = z.object({
  id: z.number().optional(),
  tenantId: z.string(),
  attireId: z.number(),
  startDate: z.string(), // ISO date string
  endDate: z.string(), // ISO date string
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).default("PENDING"),
  customerName: z.string(),
  userEmail: z.string().email(),
});

export type Booking = z.infer<typeof BookingSchema>;



// @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String tenantId;
//     private Long attireId;

//     private LocalDate startDate;
//     private LocalDate endDate;

//     private String status = "PENDING"; // PENDING, APPROVED, REJECTED
//     private String customerName;
//     private String userEmail;