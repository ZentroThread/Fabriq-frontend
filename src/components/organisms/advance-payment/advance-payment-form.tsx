import ReadOnlyField from "@/components/molecules/input/read-only-field";
import EditableField from "@/components/molecules/input/editable-field";
import {type AdvancePaymentRequest } from "@/types/advance-payment.type";
import Button from "@/components/atoms/button/add-button";

type AdvancePaymentFormProps = {
  empName: string;
  formData: Partial<AdvancePaymentRequest>;
  onchange: <K extends keyof AdvancePaymentRequest>(field: K, value: AdvancePaymentRequest[K]) => void;
  advancePaymentId?: number;
  handleAddAdvancePayment: () => void;
  handleAdvancePaymentUpdate: (id: number) => void;
  isUpdateMode: boolean;
};

export const AdvancePaymentForm = (props: AdvancePaymentFormProps) => {
  return (
    <div className="space-y-6 p-6 bg-card rounded-2xl shadow-md ">

      <ReadOnlyField
        label="Employee Name"
        value={props.empName || "N/A"}
      />

      <EditableField
        label="Reason for Advance Payment"
        value={props.formData.reason || " "}
        onChange={(e) => props.onchange("reason", e.target.value)}
      />

      <EditableField
        label="Amount"
        value={props.formData.amount !== undefined ? 
        props.formData.amount : "0"}
        onChange={(e) => props.onchange("amount", Number(e.target.value))}
      />

      <div className="flex justify-end mt-auto pt-4">
        <Button 
          text={
            props.isUpdateMode ? "Update" : "Add"
          } width="w-32" 
          onClick={() => 
            props.isUpdateMode ? 
            props.handleAdvancePaymentUpdate(props.advancePaymentId || 0) : 
            props.handleAddAdvancePayment()
          } 
        />
      </div>
    </div>
  )
}