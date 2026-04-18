import { billingService } from "@/services/billing.service";
import type { Bill, BillingType } from "@/types/bill.type";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/swal";
import { logger } from "@/utils/logger";
import { useAuthStore } from "@/store/user-auth-store";
import useBillingStore from "@/store/billing-store";

export const useGetAllBills = () => {
  const user = useAuthStore((state) => state.user);
  const hasAccess = user?.role === "owner" || user?.role === "cashier";

  return useQuery({
    queryKey: ["bills"],
    queryFn: async (): Promise<Bill[]> => {
      try {
        const data = await billingService.getAllBillings();
        return data.map((bill) => ({
          ...bill,
          billingTotal: String(bill.billingTotal),
          custCode: bill.customer?.custCode,
          customer: undefined,
        })) as Bill[];
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error, "Failed to fetch bills");
        logger.error(errorMessage, error, true);
        throw error;
      }
    },
    retry: 1,
    enabled: !!hasAccess,
  });
};

export const usePayBilling = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      discountPercentage = 0,
      paymentMethod = "cash",
    }: {
      discountPercentage?: number;
      paymentMethod?: string;
    }) => {
      const storeState = useBillingStore.getState();
      const items = storeState.items;
      const customer = storeState.selectedCustomer;

      if (!items || items.length === 0) throw new Error("No items to bill");
      if (!customer) throw new Error("No selected customer");

      const customerRecord = customer as Record<string, unknown>;
      const customerCode =
        customer.custCode ||
        (typeof customerRecord.cust_code === "string"
          ? (customerRecord.cust_code as string)
          : undefined) ||
        (customerRecord.cust_id ? String(customerRecord.cust_id) : undefined);

      if (!customerCode) throw new Error("Customer code is required");

      const payload = {
        customerCode,
        items: items.map((item) => ({
          attireCode: item.itemCode,
          rentDate: item.startDate || new Date().toISOString().split("T")[0],
          returnDate: item.endDate || undefined,
          isCustomItem: item.isCustomItem || false,
          customItemName: item.isCustomItem ? item.name : undefined,
          customPrice: item.isCustomItem ? item.price : undefined,
        })),
        discountPercentage,
        paymentMethod,
      };

      const resp = await billingService.createBillingAndPay(payload);

      const respTyped = resp as
        | { billHtml?: string; billing?: BillingType }
        | undefined;

      return respTyped;
    },
    onSuccess: (data) => {
      if (data?.billHtml) {
        const w = window.open("");
        if (w) {
          w.document.write(data.billHtml);
          w.document.close();
          w.focus();
          setTimeout(() => {
            w.print();
            w.close();
          }, 300);
        }
      }

      useBillingStore.getState().clearAll();
      queryClient.invalidateQueries({ queryKey: ["bills"] });

      setTimeout(() => {
        try {
          window.location.reload();
        } catch {
          // ignore
        }
      }, 1000);
    },
    onError: (error) => {
      const msg = getErrorMessage(error, "Failed to complete billing");
      logger.error("payBilling failed", error, true);
      useBillingStore.getState().setError(msg);
    },
  });
};
