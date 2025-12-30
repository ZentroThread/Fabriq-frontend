import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddCustomerForm from "@/components/organisms/forms/addcustomer-form";
import { useState } from "react";
import useBillingStore from "@/store/customer-store";
import Swal from "sweetalert2";
import { AlertDialogDemo } from "@/components/atoms/alert/alert-dialog";
import type { BackendCustomerPayload } from "@/types/item.types";

function toTitleCase(name?: string) {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

interface UpdateCustomerFormData {
  custCode?: string;
  fullName?: string;
  mobileNumber?: string;
  landline?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}
interface CustomerCardProps {
  customer: {
    custLandLine: string | undefined;
    custCode: string;
    custName: string;
    custMobileNumber: string;
    custWhatsappNumber?: string;
    custEmail?: string;
    custAddress?: string;
    custRegistrationDate?: string | Date;
  };
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  const [open, setOpen] = useState(false);

  const deleteCustomer = async () => {
    try {
      await useBillingStore.getState().deleteCustomer(customer.custCode);
      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: `${toTitleCase(customer.custName)} has been deleted successfully.`,
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      Swal.fire({ icon: "error", title: "Delete failed", text: message });
    }
  };

  const handleUpdate = async (data: UpdateCustomerFormData) => {
    // Map AddCustomerForm values back to backend payload shape
    const payload: Partial<BackendCustomerPayload> = {
      custCode: data.custCode,
      custName: data.fullName ?? "",
      custMobileNumber: data.mobileNumber ?? "",
      custLandLine: data.landline ?? "",
      custWhatsappNumber: data.whatsapp ?? "",
      custEmail: data.email ?? "",
      custAddress: data.address ?? "",
    };

    await useBillingStore.getState().updateCustomer(customer.custCode, payload);
    setOpen(false);
  };

  return (
    <>
      <Card className="w-auto overflow-hidden shadow-md bg-card rounded-xl hover:scale-101">
        <CardHeader>
          <CardTitle className="text-lg text-text-inactive text-style">
            {toTitleCase(customer.custName)} <br />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <div
                className="w-24 text-left font-medium"
                style={{ color: "var(--color-position-text)" }}
              >
                Code:
              </div>
              <div
                className="flex-1 text-left truncate"
                style={{ color: "var(--color-position-text)" }}
              >
                {customer.custCode}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="w-24 text-left font-medium"
                style={{ color: "var(--color-position-text)" }}
              >
                Address:
              </div>
              <div
                className="flex-1 text-left truncate"
                style={{ color: "var(--color-position-text)" }}
              >
                {customer.custAddress || "-"}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="w-24 text-left font-medium"
                style={{ color: "var(--color-position-text)" }}
              >
                Mobile:
              </div>
              <div
                className="flex-1 text-left truncate"
                style={{ color: "var(--color-position-text)" }}
              >
                {customer.custMobileNumber || "-"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-24 text-left font-medium"
                style={{ color: "var(--color-position-text)" }}
              >
                WhatsApp:
              </div>
              <div
                className="flex-1 text-left truncate"
                style={{ color: "var(--color-position-text)" }}
              >
                {customer.custWhatsappNumber || "-"}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="w-24 text-left font-medium"
                style={{ color: "var(--color-position-text)" }}
              >
                Registered:
              </div>
              <div
                className="flex-1 text-left truncate"
                style={{ color: "var(--color-position-text)" }}
              >
                {customer.custRegistrationDate
                  ? new Date(customer.custRegistrationDate).toLocaleDateString()
                  : "-"}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="px-3 py-1 rounded bg-bg-green text-light-white"
              onClick={() => setOpen(true)}
            >
              Edit
            </button>
            <AlertDialogDemo
              title={"Delete Customer"}
              description={"Are you sure you want to delete this customer?"}
              cancel={"Cancel"}
              yes={"Delete"}
              yesColor="bg-red border-1 "
              onConfirm={deleteCustomer}
            >
              <button className="px-3 py-1 rounded bg-bg-red text-light-white">
                Delete
              </button>
            </AlertDialogDemo>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] bg-card">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-style font-extrabold text-xl">
              Edit Customer
            </DialogTitle>
          </DialogHeader>
          <AddCustomerForm
            editMode
            customerData={{
              fullName: customer.custName,
              address: customer.custAddress,
              mobileNumber: customer.custMobileNumber,
              landline: customer.custLandLine,
              whatsapp: customer.custWhatsappNumber,
              email: customer.custEmail,
            }}
            onSubmit={handleUpdate}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
