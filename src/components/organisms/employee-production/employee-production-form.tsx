import BaseInputField from "@/components/molecules/input/base-input-field";
import Button from "@/components/atoms/button/custom-button";
import { type EmployeeProductionRequest } from "@/types/employee-product.type";

type EmployeeProductionFormProps = {
  empName: string;
  formData: Partial<EmployeeProductionRequest>;
  onChange: <K extends keyof EmployeeProductionRequest>(
    field: K,
    value: EmployeeProductionRequest[K]
  ) => void;
  productionId?: number;
  handleAddProduction: () => void;
  handleProductionUpdate: (id: number) => void;
  isUpdateMode: boolean;
};

export default function EmployeeProductionForm(
  props: EmployeeProductionFormProps
) {
  return (
    <div className="space-y-6 p-6 bg-card rounded-2xl shadow-md ">
      <BaseInputField
        label="Employee Name"
        value={props.empName || "N/A"}
        readonly={true}
      />

      <BaseInputField
        label="Production Name"
        value={props.formData.productionName || " "}
        onChange={(e) => props.onChange("productionName", e)}
      />

      <BaseInputField
        label="Quantity"
        value={
          props.formData.quantity !== undefined ? props.formData.quantity : "0"
        }
        onChange={(e) => props.onChange("quantity", Number(e))}
      />

      <BaseInputField
        label="Rate Per Product"
        value={
          props.formData.ratePerProduct !== undefined
            ? props.formData.ratePerProduct
            : "0"
        }
        onChange={(e) => props.onChange("ratePerProduct", Number(e))}
      />

      <BaseInputField
        label="Total"
        value={
          props.formData.ratePerProduct && props.formData.quantity
            ? (
                props.formData.ratePerProduct * props.formData.quantity
              ).toString()
            : "0"
        }
        readonly={true}
      />
      <div className="flex justify-end mt-auto pt-4">
        <Button
          text={props.isUpdateMode ? "Update" : "Add"}
          width="w-32"
          onClick={() =>
            props.isUpdateMode
              ? props.handleProductionUpdate(props.productionId || 0)
              : props.handleAddProduction()
          }
        />
      </div>
    </div>
  );
}
