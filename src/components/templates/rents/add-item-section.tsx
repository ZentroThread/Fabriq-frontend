import InputField from "@/components/molecules/input/input-feild";
import { useState } from "react";
import Chart from "../Chart";
import Button from "@/components/atoms/button/add-button";
import { Plus } from "lucide-react";

export default function AddItemsSection() {
  const [days, setDays] = useState(1);

  return (
    <div>
      <Chart
        label={"Add Items"}
        description={"Select items to add to the rental"}
        height="h-auto"
      >
        <InputField label="Selet Item" placeholder="Enter item code" />
        <InputField
          label="Days"
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        />
        <Button width="w-auto" text={"Add"} icon={<Plus />} />
      </Chart>
    </div>
  );
}
