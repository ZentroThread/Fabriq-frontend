import InputField from "@/components/molecules/input/InputField";
import Chart from "../Chart";
import { Mail, Phone, User } from "lucide-react";

export default function CustomerInformation() {
  return (
    <div>
      <Chart
        label={"Customer Information"}
        description={"Enter customer details for the rental"}
        height="h-full"
      >
        <div className="grid grid-cols-1 mb-5 ">
          <InputField
            label="Full Name"
            icon={<User />}
            placeholder="Enter customer name"
          />
          <InputField
            label="Phone Number"
            icon={<Phone />}
            placeholder="077-1234567"
          />
          <InputField
            label="Email (Optional)"
            icon={<Mail />}
            placeholder="customer@email.com"
          />
        </div>
      </Chart>
    </div>
  );
}
