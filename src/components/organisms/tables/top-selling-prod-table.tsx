import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TopSellingProduct = {
  productName: string;
  sales: number;
  revenue: number;
};

export function TopSellingProdTable({ tableData }: { tableData: TopSellingProduct[] }) {
 
  const totalSales = tableData.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = tableData.reduce((sum, item) => sum + item.revenue, 0);

  const formatCurrency = (value: number) =>
    `Rs.${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <Table className="w-full text-sm shadow-lg rounded-lg overflow-hidden">
      <TableHeader className="bg-gray-100 uppercase text-gray-700">
        <TableRow>
          <TableHead className="w-[150px] text-left px-4 py-2">Product</TableHead>
          <TableHead className="text-left px-4 py-2">Sales</TableHead>
          <TableHead className="text-right px-4 py-2">Revenue</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tableData.map((product, idx) => (
          <TableRow
            key={product.productName}
            className={`border-b border-border hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} text-position-text`}
          >
            <TableCell className="font-medium px-4 py-2 text-position-text">{product.productName}</TableCell>
            <TableCell className="px-4 py-2 text-position-text">{product.sales}</TableCell>
            <TableCell className="text-right px-4 py-2 text-position-text">{formatCurrency(product.revenue)}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter className="bg-gray-100 font-semibold">
        <TableRow>
          <TableCell className="px-4 py-2 text-position-text">Total</TableCell>
          <TableCell className="px-4 py-2 text-position-text">{totalSales}</TableCell>
          <TableCell className="text-right px-4 py-2 text-position-text">{formatCurrency(totalRevenue)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
