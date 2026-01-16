import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CustomerWithRental = {
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
}: {
  tableData: CustomerWithRental[];
}) {
  return (
    <Table className="w-full text-sm shadow-lg rounded-lg overflow-hidden">
      
      {/* Table Header */}
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
        </TableRow>
      </TableHeader>

      {/* Table Body */}
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
              }`}
            >
              <TableCell className="px-4 py-2 font-medium">
                {item.rentalId}
              </TableCell>
              <TableCell className="px-4 py-2">{item.customerName}</TableCell>
              <TableCell className="px-4 py-2">{item.contactNumber}</TableCell>
              <TableCell className="px-4 py-2">{item.itemName}</TableCell>
              <TableCell className="px-4 py-2">{item.rentalDate}</TableCell>
              <TableCell className="px-4 py-2">{item.returnDate}</TableCell>
              <TableCell className="px-4 py-2">
                {item.fitOnDate ?? "N/A"}
              </TableCell>
              <TableCell className="px-4 py-2">
                {item.fitOnStatus ?? "Pending"}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
