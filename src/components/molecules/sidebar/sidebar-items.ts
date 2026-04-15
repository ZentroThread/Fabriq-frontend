import {
  Box,
  FingerprintPattern,
  LayoutDashboard,
  NotebookText,
  ReceiptText,
  Users,
  CalendarCheck,
  MessageSquare
} from "lucide-react";

export type UserRole = "owner" | "cashier" | "sales_assistant";

export const sidebarItems = {
  owner: [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Employees", icon: Users, to: "/emp" },
    { label: "Attendance", icon: FingerprintPattern, to: "/attendance" },
    { label: "Rentals & Billing", icon: ReceiptText, to: "/rent" },
    { label: "Items", icon: Box, to: "/attire" },
    { label: "Reports", icon: NotebookText, to: "/reports" },
    { label: "Feedback", icon: MessageSquare, to: "/feedback" },
    { label: "Booking", icon: CalendarCheck, to: "/bookings" },
  ],

  cashier: [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Rentals & Billing", icon: ReceiptText, to: "/rent" },
    { label: "Items", icon: Box, to: "/attire" },
  ],

  sales_assistant: [
    { label: "Items", icon: Box, to: "/attire" },
  ],
};
