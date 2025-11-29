import RentalSummary from "@/components/templates/rents/rental-summary";
import CustomerInformation from "@/components/templates/rents/customer-information";
import RentalBillingLayout from "@/components/organisms/layout/rental-billing-layout";
import RentalDuration from "@/components/templates/rents/rental-duration";
import AddItemsSection from "@/components/templates/rents/add-item-section";
import RentalItemsSection from "@/components/templates/rents/rental-item-section";
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
