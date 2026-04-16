import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { exportUpcomingReturnsExcel } from "@/utils/exportExcel";
import { Download } from "lucide-react";
import AddButton from "@/components/atoms/button/custom-button";

export type CustomerWithUpcomingRental = {
  rentalId: string;
  customerName: string;
  contactNumber: string;
  itemName: string;
  rentalDate: string;
  returnDate: string;
};

interface CustomerWithRentalTableProps {
  tableData: CustomerWithUpcomingRental[];
  timeRange?: string;
}

export function CustomerWithRentalTable({
  tableData,
  timeRange,
}: CustomerWithRentalTableProps) {
  return (
    <div className="w-full">
      <div className="flex justify-end mb-2">
        <AddButton
          text="Export"
          icon={<Download />}
          onClick={() => exportUpcomingReturnsExcel(tableData, timeRange)}
        />
      </div>

      {/* Table */}
      <Table className="w-full text-sm shadow-lg rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-100 uppercase text-position-text">
          <TableRow>
            <TableHead className="px-4 py-2">Rental ID</TableHead>
            <TableHead className="px-4 py-2">Customer</TableHead>
            <TableHead className="px-4 py-2">Contact</TableHead>
            <TableHead className="px-4 py-2">Item</TableHead>
            <TableHead className="px-4 py-2">Pickup Date</TableHead>
            <TableHead className="px-4 py-2">Return Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                No upcoming rentals found
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((item, idx) => (
              <TableRow
                key={item.rentalId}
                className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-accent`}
              >
                <TableCell className="px-4 py-2 font-medium text-position-text">
                  {item.rentalId}
                </TableCell>
                <TableCell className="px-4 py-2 text-position-text">
                  {item.customerName}
                </TableCell>
                <TableCell className="px-4 py-2 text-position-text">
                  {item.contactNumber}
                </TableCell>
                <TableCell className="px-4 py-2 text-position-text">
                  {item.itemName}
                </TableCell>
                <TableCell className="px-4 py-2 text-position-text">
                  {item.rentalDate}
                </TableCell>
                <TableCell className="px-4 py-2 text-position-text">
                  {item.returnDate}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
