import { Pencil, Trash2 } from "lucide-react";
import Table from "@/components/molecules/Table/table";
import type { AdvancePaymentResponse } from "@/types/advance-payment.type";

const columns = [
  {header:"Date",accessor:"date" as const},
  {header:"Amount",accessor:"amount" as const},
  {header:"Reason",accessor:"reason" as const},
];

type AdvancePaymentTableProps = {
  data:AdvancePaymentResponse[];
  handleSetIsUpdateMode: (id: number) => void;
  handleAdvancePaymentDelete: (id: number) => void;
};

export default function AdvancePaymentsTable({ data: advancePayments, handleSetIsUpdateMode, handleAdvancePaymentDelete }: AdvancePaymentTableProps) {
  return (
    <Table
      columns={columns}
      data={advancePayments}
      actions={(payment) => (
        <div className="flex gap-2">
          <Pencil
            className="text-[#d1a47c] w-5 h-5 cursor-pointer"
            onClick={() => handleSetIsUpdateMode(Number(payment.id))}
          />
          <Trash2
            className="text-[#fa7f83] w-5 h-5 cursor-pointer"
            onClick={() => handleAdvancePaymentDelete(Number(payment.id))}
          />
        </div>
      )}
    />
  );
}