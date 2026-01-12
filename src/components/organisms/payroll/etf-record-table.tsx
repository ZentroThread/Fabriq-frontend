import Table from "@/components/molecules/Table/table";
import type { ETFFormType } from "@/types/payroll-type";

const columns: Array<{ header: string; accessor: keyof ETFFormType }> = [
  { header: "Employee Name", accessor: "employeeName" },
  { header: "NIC", accessor: "nic" },
  { header: "Member No", accessor: "epfNumber" },
  { header: "ETF Salary", accessor: "etfSalary" },
  { header: "Contribution", accessor: "etfContribution" },
];

type EtfRecordTableProps = {
  data: ETFFormType[];
};

export default function EtfRecordTable({ data: etfRecords }: EtfRecordTableProps) {
  return <Table
          columns={columns} 
          data={etfRecords} 
        />;
}