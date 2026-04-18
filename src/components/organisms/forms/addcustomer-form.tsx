import InputField from "@/components/molecules/input/input-feild";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { House, Mail, Phone, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect } from "react";
import { normalizePhoneForProvider } from "@/utils/phone";
import billingStore from "@/store/billing-store";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AddCustomerFormValues } from "@/types/types";
import { addCustomerSchema } from "@/schemas/user.schema";
import { notificationService } from "@/services/notification.service";
import { logger } from "@/utils/logger";
import { useAddCustomer } from "@/hooks/customer/useCustomer";

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
  const addMutation = useAddCustomer();

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

    addMutation.mutate(apiPayload, {
      onSuccess: async (created) => {
        if (!created) return;

        const c = created as unknown as Record<string, unknown>;
        const custName = String(c.custName ?? c.cust_name ?? "Customer");
        const custCode = String(c.custCode ?? c.cust_code ?? "");

        notificationService
          .sendWelcomeNotification(
            created as Parameters<
              typeof notificationService.sendWelcomeNotification
            >[0]
          )
          .catch((e) => {
            logger.warn("Welcome SMS failed to send", e, true);
          });

        await Swal.fire({
          icon: "success",
          title: "Customer added",
          text: `${custName} has been added successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });

        try {
          const storeSetter = billingStore.getState().setSelectedCustomer;
          storeSetter({
            ...created,
            custCode,
          } as Parameters<typeof storeSetter>[0]);
        } catch (e) {
          logger.warn(
            "Customer added, but auto-select failed. Please search manually.",
            e,
            true
          );
        }

        reset();
        onClose?.();
      },
      onError: (err) => {
        logger.error("Failed to add customer", err, true);
      },
    });
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
