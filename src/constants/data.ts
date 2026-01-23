import {type CustomerWithRental } from "../components/organisms/tables/customer-with-first-fit-on-table";

export const sampleRentalData: CustomerWithRental[] = [
  {
    rentalId: "RNT001",
    customerName: "Alice Fernando",
    contactNumber: "0771234567",
    itemName: "Bridal Saree - Red Velvet",
    rentalDate: "2026-01-20",
    returnDate: "2026-01-25",
    fitOnDate: "2026-01-21",
    fitOnStatus: "Pending",
  },
  {
    rentalId: "RNT002",
    customerName: "Nimal Perera",
    contactNumber: "0719876543",
    itemName: "Groom Suit - Black",
    rentalDate: "2026-01-22",
    returnDate: "2026-01-27",
    fitOnDate: "2026-01-23",
    fitOnStatus: "Completed",
  },
  {
    rentalId: "RNT003",
    customerName: "Samantha Jayasuriya",
    contactNumber: "0723456789",
    itemName: "Bridal Saree - Cream Lace",
    rentalDate: "2026-01-24",
    returnDate: "2026-01-29",
    fitOnDate: "2026-01-25",
    fitOnStatus: "Missed",
  },
  {
    rentalId: "RNT004",
    customerName: "Kamal Silva",
    contactNumber: "0765432198",
    itemName: "Groom Suit - Navy Blue",
    rentalDate: "2026-01-26",
    returnDate: "2026-01-31",
    fitOnDate: "2026-01-27",
    fitOnStatus: "Pending",
  },
];

export const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export const chartDataDonut = [
  { browser: "chrome", visitors: 275, fill: "var(--color-pie-1)" },
  { browser: "safari", visitors: 200, fill: "var(--color-pie-2)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-pie-3)" },
];

export const employees = [
  {
    initials: "NP",
    id: "1",
    name: "Nimal Perera",
    role: "Sales Assistant",
    phone: "077-2345678",
    salary: "38,000",
    status: "Present",
    joinDate: "2024-02-20",
  },
  {
    initials: "KF",
    id: "2",
    name: "Kumari Fernando",
    role: "Sales Assistant",
    phone: "077-3456789",
    salary: "38,000",
    status: "Leave",
    joinDate: "2024-03-10",
  },
  {
    initials: "RD",
    id: "3",
    name: "Roshan Dias",
    role: "Stock Manager",
    phone: "077-4567890",
    salary: "50,000",
    status: "Present",
    joinDate: "2023-11-05",
  },
  {
    initials: "SW",
    id: "4",
    name: "Sanduni Wijesinghe",
    role: "Designer",
    phone: "077-5678901",
    salary: "55,000",
    status: "Absent",
    joinDate: "2024-04-01",
  },
];

export const items = [
  { name: "Saree A", price: 2000, days: 3 },
  { name: "Saree B", price: 2500, days: 2 },
  { name: "Saree C", price: 1800, days: 5 },
];

export const invoices = [
  {
    invoice: "INV001",

    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",

    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",

    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",

    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",

    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",

    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
];

export const leaveRecords = [
  { id: 1, remark: "Sick Leave", date: "2025-11-18" },
  { id: 2, remark: "Personal Leave", date: "2025-11-15" },
  { id: 3, remark: "Half Day", date: "2025-11-10" },
];

export const categories = [
  { value: 1, label: "Saree" },
  { value: 2, label: "Nilame" },
  { value: 3, label: "Jewelry" },
];

export const status = [
  { value: "Available", label: "Available" },
  { value: "In Laundry", label: "In Laundry" },
  { value: "Rented", label: "Rented" },
];
