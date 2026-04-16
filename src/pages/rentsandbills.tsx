import RentalSummary from "@/components/templates/rents/rental-summary";
import RentalBillingLayout from "@/components/organisms/layout/rental-billing-layout";
import AddItemsSection from "@/components/templates/rents/add-item-section";
import RentalItemsSection from "@/components/templates/rents/rental-item-section";
import { RentsAndBillsSkeleton } from "@/components/molecules/skeletons/rents-bills-skeleton";
import { useState, useEffect } from "react";
import CustomButton from "@/components/atoms/button/custom-button";
import { useNavigate } from "react-router-dom";
import { Eye, Plus, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddCustomerForm from "@/components/organisms/forms/addcustomer-form";

export const RentsAndBill = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <RentsAndBillsSkeleton />;
  }

  return (
    <div className="p-5">
      <div className="text-style text-[30px] font-semibold">
        Rentals & Billing
      </div>
      <div className="text-position-text ">
        Create rental agreements and process payments
      </div>
      <div className="flex flex-wrap gap-4 lg:gap-6 lg:mr-5 mt-4 lg:mt-0 lg:ml-auto justify-start sm:justify-end">
        <CustomButton
          text={"Register Customer"}
          width="w-auto"
          icon={<Plus />}
          onClick={() => setIsDialogOpen(true)}
        />
        <CustomButton
          text={"View All Customers"}
          width="w-auto"
          icon={<Users />}
          onClick={() => navigate("/customers")}
        />
        <CustomButton
          text={"View All Orders"}
          width="w-auto"
          icon={<Eye />}
          onClick={() => navigate("/bills")}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] bg-card ">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-style font-extrabold text-xl">
              Register Customer
            </DialogTitle>
            <DialogDescription className="text-position-text font-light">
              Enter customer details for the rental
            </DialogDescription>
          </DialogHeader>
          <AddCustomerForm onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      <RentalBillingLayout
        items={<AddItemsSection />}
        summary={<RentalSummary />}
        rentList={<RentalItemsSection />}
      />
    </div>
  );
};
