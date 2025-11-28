import InputField from "@/components/molecules/input/InputField"
import Chart from "../charts/Chart";
import { Mail, Phone, User } from "lucide-react";

export default function CustomerInformation() {
  return (
    
      <div>
       <Chart
          label={"Customer Information"}
          description={"Enter customer details for the rental"}
          height="h-100"
        >
          
<InputField label="Full Name" icon={<User />} placeholder="Enter customer name" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
        <InputField label="Phone Number" icon={<Phone />} placeholder="077-1234567" />
        <InputField label="Email (Optional)" icon={<Mail />} placeholder="customer@email.com" />
      </div>
        
        </Chart>
      </div>
    
  );
}
