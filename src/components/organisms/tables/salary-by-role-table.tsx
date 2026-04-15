import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PayrollByRole = {
  role: string;
  totalSalary: number;
  employeeCount: number;
};

export function PayrollByRoleTable({
  tableData,
}: {
  tableData: PayrollByRole[];
}) {
  const totalEmployees = tableData.reduce(
    (sum, item) => sum + item.employeeCount,
    0
  );
  const totalSalary = tableData.reduce(
    (sum, item) => sum + item.totalSalary,
    0
  );

  const formatCurrency = (value: number) =>
    `Rs.${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <Table className="w-full text-sm shadow-lg rounded-lg overflow-hidden">
      {/* Table Header */}
      <TableHeader className="bg-gray-100 uppercase text-position-text">
        <TableRow>
          <TableHead className="w-[200px] text-left px-4 py-2">Role</TableHead>
          <TableHead className="text-left px-4 py-2">Employees</TableHead>
          <TableHead className="text-right px-4 py-2">Total Salary</TableHead>
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      <TableBody>
        {tableData.map((roleData, idx) => (
          <TableRow
            key={roleData.role}
            className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
          >
            <TableCell className="font-medium px-4 py-2 text-position-text">
              {roleData.role}
            </TableCell>
            <TableCell className="px-4 py-2 text-position-text">
              {roleData.employeeCount}
            </TableCell>
            <TableCell className="text-right px-4 py-2 text-position-text">
              {formatCurrency(roleData.totalSalary)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* Table Footer */}
      <TableFooter className="bg-gray-100 font-semibold">
        <TableRow>
          <TableCell className="px-4 py-2 text-position-text">Total</TableCell>
          <TableCell className="px-4 py-2 text-position-text">
            {totalEmployees}
          </TableCell>
          <TableCell className="text-right px-4 py-2 text-position-text">
            {formatCurrency(totalSalary)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
