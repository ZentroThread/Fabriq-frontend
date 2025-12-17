import InputField from "@/components/molecules/input/input-feild";
import Chart from "../Chart";
import { Mail, Phone, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

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
            label="Mobile Number"
            icon={<Phone />}
            placeholder="077-xxxxxxx"
          />
          
          <InputField
            label="Home Land Line"
            icon={<User />}
            placeholder="033-xxxxxxx"
          />
          <InputField
            label="WhatsApp Number"
            icon={<FaWhatsapp />}
            placeholder="077-xxxxxxx"
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
