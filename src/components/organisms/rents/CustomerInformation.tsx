import InputField from "@/components/molecules/input/inputField"
import { HiUser, HiPhone, HiMail } from "react-icons/hi";

export default function CustomerInformation() {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl text-style mb-2">Customer Information</h2>
      <p className="text-muted-foreground mb-6">Enter customer details for the rental</p>

      <InputField label="Full Name" icon={<HiUser />} placeholder="Enter customer name" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
        <InputField label="Phone Number" icon={<HiPhone />} placeholder="077-1234567" />
        <InputField label="Email (Optional)" icon={<HiMail />} placeholder="customer@email.com" />
      </div>
    </div>
  );
}
