import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {type CustomerWithRental } from "../components/organisms/tables/customer-with-first-fit-on-table";
import {type CustomerWithUpcomingRental} from "../components/organisms/tables/customer-with-rental";

export const exportUpcomingRentalsExcel = (
  data: CustomerWithRental[],
  timeRange?: string
) => {
  const worksheetData = data.map((item) => ({
    "Rental ID": item.rentalId,
    "Customer": item.customerName,
    "Contact": item.contactNumber,
    "Item": item.itemName,
    "Pickup Date": item.rentalDate,
    "Return Date": item.returnDate,
    "First Fit-On": item.fitOnDate ?? "",
    "Fit-On Status": item.fitOnStatus ?? "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Upcoming Rentals");

  const fileName = `Upcoming_Rentals_${timeRange ?? "All"}_${new Date()
    .toLocaleDateString()
    .replace(/\//g, "-")}.xlsx`;

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};

export const exportUpcomingReturnsExcel = (
  data: CustomerWithUpcomingRental[],
  timeRange?: string
) => {
  const worksheetData = data.map((item) => ({
    "Rental ID": item.rentalId,
    "Customer": item.customerName,
    "Contact": item.contactNumber,
    "Item": item.itemName,
    "Pickup Date": item.rentalDate,
    "Return Date": item.returnDate,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Upcoming Returns");

  const fileName = `Upcoming_Returns_${timeRange ?? "All"}_${new Date()
    .toLocaleDateString()
    .replace(/\//g, "-")}.xlsx`;

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
