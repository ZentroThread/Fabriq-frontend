import type { EPFFormType } from "@/types/payroll-type";
import Table from "@/components/molecules/Table/table";

const columns: Array<{ header: string; accessor: keyof EPFFormType }> = [
  { header: "Employee Name", accessor: "employeeName" },
  { header: "NIC", accessor: "nic" },
  { header: "EPF Number", accessor: "epfNumber" },
  { header: "EPF Salary", accessor: "epfSalary" },
  { header: "Employee Contribution", accessor: "epfEmployeeContribution" },
  { header: "Employer Contribution", accessor: "epfEmployerContribution" },
  { header: "Total", accessor: "total" },
];

type EpfRecordTableProps = {
  data: EPFFormType[];
};

export default function EpfRecordTable({ data: epfRecords }: EpfRecordTableProps) {
  return <Table
          columns={columns} 
          data={epfRecords} 
        />;
}