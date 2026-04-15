import InputField from "@/components/molecules/input/input-feild";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { House, Mail, Phone, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect } from "react";
import { normalizePhoneForProvider } from "@/lib/phone";
import useBillingStore from "@/store/customer-store";
import billingStore from "@/store/billing-store";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AddCustomerFormValues } from "@/types/types";
import { addCustomerSchema } from "@/schemas/user.schema";
import {
  notificationService,
  type CustomerApiResponse,
} from "@/services/notification.service";
import { logger } from "@/utils/logger";

interface AddCustomerFormProps {
  onClose?: () => void;
  onSubmit?: (data: AddCustomerFormValues) => void;
  editMode?: boolean;
  customerData?: Partial<AddCustomerFormValues>;
}

export function AddCustomerForm({
  onClose,
  onSubmit,
  editMode = false,
  customerData,
}: AddCustomerFormProps) {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddCustomerFormValues>({
    resolver: zodResolver(addCustomerSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      address: "",
      landline: "",
      whatsapp: "",
      email: "",
    },
  });
  const fetchCustomers = useBillingStore((s) => s.fetchCustomers);

  useEffect(() => {
    if (editMode && customerData) {
      reset({
        fullName: customerData.fullName ?? "",
        address: customerData.address ?? " ",
        mobileNumber: customerData.mobileNumber ?? "",
        landline: customerData.landline ?? "",
        whatsapp: customerData.whatsapp ?? "",
        email: customerData.email ?? "",
      });
    }
  }, [editMode, customerData, reset]);
  const onSubmitForm = async (values: AddCustomerFormValues) => {
    if (onSubmit) {
      onSubmit(values);
      return;
    }

    const apiPayload = {
      custName: values.fullName,
      custMobileNumber: values.mobileNumber,
      custAddress: values.address,
      custLandLine: values.landline ?? "",
      custWhatsappNumber: normalizePhoneForProvider(
        values.whatsapp ?? values.mobileNumber ?? ""
      ),
      custEmail: values.email ?? "",
    };

    try {
      const created = (await useBillingStore
        .getState()
        .addCustomer(apiPayload)) as CustomerApiResponse;
      if (created) {
        notificationService.sendWelcomeNotification(created).catch((e) => {
          logger.warn("Welcome SMS failed to send", e, true);
        });

        await Swal.fire({
          icon: "success",
          title: "Customer added",
          text: `${created.custName ?? created.cust_name} has been added successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });
        await fetchCustomers();

        try {
          billingStore.getState().setSelectedCustomer({
            ...created,
            cust_id: created.custId ?? created.cust_id,
            custCode: created.custCode ?? created.cust_code,
          });
        } catch (e) {
          logger.warn(
            "Customer added, but auto-select failed. Please search manually.",
            e,
            true
          );
        }

        reset();
        onClose?.();
      } else {
        logger.error(
          "Customer was not added. Please try again.",
          undefined,
          true
        );
      }
    } catch (err: unknown) {
      logger.error("Failed to add customer", err, true);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4"></div>
      <form onSubmit={rhfHandleSubmit(onSubmitForm)} className="bg-card">
        <ScrollArea className="h-[500px] w-full pr-4 [&>div>div]:space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
          <div className="grid grid-cols-1 mb-5 ">
            <InputField
              label="Full Name"
              icon={<User />}
              placeholder="Enter customer name"
              {...register("fullName")}
            />
            {errors.fullName && (
              <div className="text-xs form-error">
                {errors.fullName.message}
              </div>
            )}
            <InputField
              label="Address"
              icon={<House />}
              placeholder="Enter customer address"
              {...register("address")}
            />
            {errors.address && (
              <div className="text-xs form-error">{errors.address.message}</div>
            )}

            <InputField
              label="Mobile Number"
              icon={<Phone />}
              placeholder="077xxxxxxx"
              {...register("mobileNumber")}
            />
            {errors.mobileNumber && (
              <div className="text-xs form-error">
                {errors.mobileNumber.message}
              </div>
            )}

            <InputField
              label="WhatsApp Number"
              icon={<FaWhatsapp />}
              placeholder="077xxxxxxx"
              {...register("whatsapp")}
            />
            {errors.whatsapp && (
              <div className="text-xs form-error">
                {errors.whatsapp.message}
              </div>
            )}
            <InputField
              label="Home Land Line"
              icon={<User />}
              placeholder="033xxxxxxx"
              {...register("landline")}
            />
            {errors.landline && (
              <div className="text-xs form-error">
                {errors.landline.message}
              </div>
            )}

            <InputField
              label="Email (Optional)"
              icon={<Mail />}
              placeholder="customer@email.com"
              {...register("email")}
            />
            {errors.email && (
              <div className="text-xs form-error">{errors.email.message}</div>
            )}

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                className="bg-bg-red  hover:opacity-80 hover:bg-bg-red"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className=" bg-bg-green hover:opacity-80 hover:bg-bg-green "
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Adding..."
                  : editMode
                    ? "Update customer"
                    : "Add"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </form>
    </div>
  );
}

export default AddCustomerForm;
