import RentalSummary from "@/components/templates/rents/RentalSummary";
import CustomerInformation from "@/components/templates/rents/CustomerInformation";
import RentalBillingLayout from "@/components/organisms/layout/RentalBillingLayout";
import RentalDuration from "@/components/templates/rents/RentalDuration";
import AddItemsSection from "@/components/templates/rents/AddItemsSection";
import RentalItemsSection from "@/components/templates/rents/RentalItemsSection";
export const RentsAndBill = () => {
  return (
    <div className="p-5">
      <div className="text-style text-[30px] font-semibold">
        Rentals & Billing
      </div>
      <div className="text-position-text ">
        Create rental agreements and process payments
      </div>
      <RentalBillingLayout
        customerInfo={<CustomerInformation />}
        duration={<RentalDuration />}
        items={<AddItemsSection />}
        summary={<RentalSummary />}
        rentList={<RentalItemsSection />}
      />
    </div>
  );
};
