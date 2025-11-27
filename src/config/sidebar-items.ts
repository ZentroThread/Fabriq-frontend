import {
  Box,
  FingerprintPattern,
  LayoutDashboard,
  NotebookText,
  ReceiptText,
  Users,
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
  ],

  cashier: [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Rentals & Billing", icon: ReceiptText, to: "/rent" },
  ],

  sales_assistant: [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Items", icon: Box, to: "/attire" },
  ],
};
