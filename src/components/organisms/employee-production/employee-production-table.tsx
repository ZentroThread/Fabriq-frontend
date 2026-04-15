import { Pencil, Trash2 } from "lucide-react";
import Table from "@/components/molecules/Table/table";
import type { EmployeeProductionResponse } from "@/types/employee-product.type";
import { columnsEmpProd } from "@/constants/data";

type EmployeeProductionTableProps = {
  data: EmployeeProductionResponse[];
  handleSetIsUpdateMode: (id: number) => void;
  handleProductionDelete: (id: number) => void;
};

export default function EmployeeProductionTable({
  data: employeeProductions,
  handleSetIsUpdateMode,
  handleProductionDelete,
}: EmployeeProductionTableProps) {
  return (
    <Table
      columns={columnsEmpProd}
      data={employeeProductions}
      actions={(production) => (
        <div className="flex gap-2">
          <Pencil
            className="text-[#d1a47c] w-5 h-5 cursor-pointer"
            onClick={() => handleSetIsUpdateMode(Number(production.id))}
          />
          <Trash2
            className="text-[#fa7f83] w-5 h-5 cursor-pointer"
            onClick={() => handleProductionDelete(Number(production.id))}
          />
        </div>
      )}
    />
  );
}
