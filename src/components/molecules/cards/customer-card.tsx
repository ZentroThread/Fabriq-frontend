import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddCustomerForm from "@/components/organisms/forms/addcustomer-form";
import { useState } from "react";
import Swal from "sweetalert2";
import { logger } from "@/utils/logger";
import { AlertDialogDemo } from "@/components/atoms/alert/alert-dialog";
import type { BackendCustomerPayload } from "@/types/item.types";
import { InfoRow } from "@/components/atoms/label/info-row";
import {
  useDeleteCustomer,
  useUpdateCustomer,
} from "@/hooks/customer/useCustomer";

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
    custId?: number | string;
    custCode: string;
    custName: string;
    custMobileNumber: string;
    custLandLine?: string;
    custWhatsappNumber?: string;
    custEmail?: string;
    custAddress?: string;
    custRegistrationDate?: string | Date;
  };
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteCustomer();
  const updateMutation = useUpdateCustomer();

  const deleteCustomer = async () => {
    deleteMutation.mutate(
      { custCode: customer.custCode, custId: customer.custId },
      {
        onSuccess: async () => {
          await Swal.fire({
            icon: "success",
            title: "Deleted",
            text: `${toTitleCase(customer.custName)} has been deleted successfully.`,
            timer: 1800,
            showConfirmButton: false,
          });
        },
        onError: (err) => {
          logger.error("Delete failed", err, true);
        },
      }
    );
  };

  const handleUpdate = async (data: UpdateCustomerFormData) => {
    const payload: Partial<BackendCustomerPayload> = {
      custCode: data.custCode,
      custName: data.fullName ?? "",
      custMobileNumber: data.mobileNumber ?? "",
      custLandLine: data.landline ?? "",
      custWhatsappNumber: data.whatsapp ?? "",
      custEmail: data.email ?? "",
      custAddress: data.address ?? "",
    };

    updateMutation.mutate(
      { custCode: customer.custCode, payload },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
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
            <InfoRow label="Code:" value={customer.custCode} />
            <InfoRow label="Address:" value={customer.custAddress} />
            <InfoRow label="Mobile:" value={customer.custMobileNumber} />
            <InfoRow label="WhatsApp:" value={customer.custWhatsappNumber} />
            <InfoRow
              label="Registered:"
              value={
                customer.custRegistrationDate
                  ? new Date(customer.custRegistrationDate).toLocaleDateString()
                  : "-"
              }
            />
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="px-3 py-1 rounded bg-bg-green text-light-white hover:opacity-90 transition-opacity focus:ring-2 focus:ring-offset-2 focus:outline-none"
              onClick={() => setOpen(true)}
              aria-label={`Edit ${customer.custName}`}
            >
              Edit
            </button>
            <AlertDialogDemo
              title="Delete Customer"
              description={`Are you sure you want to delete ${toTitleCase(customer.custName)}? This action cannot be undone.`}
              cancel="Cancel"
              yes="Delete"
              yesColor="bg-red border-1"
              onConfirm={deleteCustomer}
            >
              <button
                className="px-3 py-1 rounded bg-bg-red text-light-white hover:opacity-90 transition-opacity focus:ring-2 focus:ring-offset-2 focus:outline-none"
                aria-label={`Delete ${customer.custName}`}
              >
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
