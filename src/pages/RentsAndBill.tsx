import RentalSummary from "@/components/organisms/rents/RentalSummary"
import CustomerInformation from "@/components/organisms/rents/CustomerInformation"
import RentalBillingLayout from "@/components/organisms/layout/RentalBillingLayout"
import RentalDuration from "@/components/organisms/rents/RentalDuration"
import AddItemsSection from "@/components/organisms/rents/AddItemsSection"
import RentalItemsSection from "@/components/organisms/rents/RentalItemsSection"
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
        duration={<RentalDuration/>}
        items={<AddItemsSection/>}
        summary={<RentalSummary />}
        rentList={<RentalItemsSection />}
      />
    </div>
     
  )
}
