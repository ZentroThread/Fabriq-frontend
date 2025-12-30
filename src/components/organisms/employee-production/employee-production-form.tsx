import ReadOnlyField from "@/components/molecules/input/read-only-field";
import EditableField from "@/components/molecules/input/editable-field";
import Button from "@/components/atoms/button/add-button";
import { type EmployeeProductionRequest } from "@/types/employee-product.type";

type EmployeeProductionFormProps = {
  empName: string;
  formData: Partial<EmployeeProductionRequest>;
  onChange: <K extends keyof EmployeeProductionRequest>(field: K, value: EmployeeProductionRequest[K]) => void;
  productionId?: number;
  handleAddProduction: () => void;
  handleProductionUpdate: (id: number) => void;
  isUpdateMode: boolean;
};

export default function EmployeeProductionForm(props: EmployeeProductionFormProps) {
  return (
    <div className="space-y-6 p-6 bg-card rounded-2xl shadow-md ">
  
      <ReadOnlyField
        label="Employee Name"
        value={props.empName || "N/A"}
      />

      <EditableField
        label="Production Name"
        value={props.formData.productionName || " "}
        onChange={(e) => props.onChange("productionName", e.target.value)}
      />

      <EditableField
        label="Quantity"
        value={props.formData.quantity !== undefined ? 
        props.formData.quantity : "0"}
        onChange={(e) => props.onChange("quantity", Number(e.target.value))}
      />

      <EditableField
        label="Rate Per Product"
        value={props.formData.ratePerProduct !== undefined ? 
        props.formData.ratePerProduct : "0"}
        onChange={(e) => props.onChange("ratePerProduct", Number(e.target.value))}
      />

      <ReadOnlyField
        label="Total"
        value={props.formData.ratePerProduct && props.formData.quantity ? 
          (props.formData.ratePerProduct * props.formData.quantity).toString() : "0"
        }
      />
      <div className="flex justify-end mt-auto pt-4">
        <Button 
          text={
            props.isUpdateMode ? "Update" : "Add"
          } width="w-32" 
          onClick={() => 
            props.isUpdateMode ? 
            props.handleProductionUpdate(props.productionId || 0) : 
            props.handleAddProduction()
          } 
        />
      </div>
    </div>
  );
}

