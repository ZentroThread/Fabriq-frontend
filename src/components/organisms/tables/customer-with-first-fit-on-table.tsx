import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { exportUpcomingRentalsExcel } from "@/utils/exportExcel";
import AddButton from "@/components/atoms/button/add-button";
import { Download } from "lucide-react";

export type CustomerWithRental = {
  rentalId: string;
  customerName: string;
  contactNumber: string;
  itemName: string;
  rentalDate: string;   
  returnDate: string;
  fitOnDate?: string;        
  fitOnStatus?: "Pending" | "Completed" | "Missed"; 
};

export function CustomerWithFirstFitOnTable({
  tableData,
  timeRange, 
}: {
  tableData: CustomerWithRental[];
  timeRange?: string;
}) {
  return (
    <>
     
      <div className="flex justify-end mb-2">
        <AddButton text="Export" icon={<Download />} 
          onClick={() => exportUpcomingRentalsExcel(tableData, timeRange)}
        />
      </div>

      <Table className="w-full text-sm shadow-lg rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-100 uppercase text-position-text">
          <TableRow>
            <TableHead className="px-4 py-2">Rental ID</TableHead>
            <TableHead className="px-4 py-2">Customer</TableHead>
            <TableHead className="px-4 py-2">Contact</TableHead>
            <TableHead className="px-4 py-2">Item</TableHead>
            <TableHead className="px-4 py-2">Pickup Date</TableHead>
            <TableHead className="px-4 py-2">Return Date</TableHead>
            <TableHead className="px-4 py-2">First Fit-On</TableHead>
            <TableHead className="px-4 py-2">Fit-On Status</TableHead>
            <TableHead className="px-4 py-2">Assigned Tailor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                No upcoming rentals found
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((item, idx) => (
              <TableRow
                key={item.rentalId}
                className={`border-b hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-accent`}
              >
                <TableCell className="px-4 py-2 font-medium text-position-text">{item.rentalId}</TableCell>
                <TableCell className="px-4 py-2 text-position-text">{item.customerName}</TableCell>
                <TableCell className="px-4 py-2 text-position-text">{item.contactNumber}</TableCell>
                <TableCell className="px-4 py-2 text-position-text">{item.itemName}</TableCell>
                <TableCell className="px-4 py-2 text-position-text">{item.rentalDate}</TableCell>
                <TableCell className="px-4 py-2 text-position-text">{item.returnDate}</TableCell>
                <TableCell className="px-4 py-2 text-position-text">{item.fitOnDate ?? "N/A"}</TableCell>
                <TableCell className="px-4 py-2 text-position-text">{item.fitOnStatus ?? "Pending"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}
