import InputField from "@/components/molecules/input/input-feild";
import { useState } from "react";
import Chart from "../Chart";
import Button from "@/components/atoms/button/add-button";
import { Plus } from "lucide-react";
import { Calendar28 } from "@/components/organisms/date-picker/calender";

export default function AddItemsSection() {
  const [days, setDays] = useState(1);

  return (
    <div>
      <Chart
        label={"Add Items"}
        description={"Select items to add to the rental"}
        height="h-auto"
      >
        <InputField label="Customer Code" placeholder="Enter customer code" />
        <InputField label="Selet Item" placeholder="Enter item code" />
        <InputField
          label="Days"
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        />
        <label
          htmlFor="orderdate"
          className="text-position-text text-[14px] font-light "
        >
          Start Date
        </label>
        <Calendar28 />
        <br />
        <label
          htmlFor="enddate"
          className="text-position-text text-[14px] font-light"
        >
          End Date
        </label>
        <Calendar28 />

        <br />
        <Button width="w-full" text={"Add"} icon={<Plus />} />
      </Chart>
    </div>
  );
}
