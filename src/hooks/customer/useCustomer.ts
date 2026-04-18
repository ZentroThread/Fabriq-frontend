import { billingService } from "@/services/billing.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/swal";
import { logger } from "@/utils/logger";
import { useAuthStore } from "@/store/user-auth-store";
import type {
  AddCustomerPayload,
  BackendCustomerPayload,
} from "@/types/item.types";

export const useGetAllCustomers = () => {
  const user = useAuthStore((state) => state.user);
  const hasAccess = user?.role === "owner" || user?.role === "cashier";

  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      try {
        const data = await billingService.getAllCustomers();
        const deletedRaw = localStorage.getItem("deleted_customers");
        const deleted: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
        const filtered = data.filter(
          (c: BackendCustomerPayload) => !deleted.includes(c.custCode)
        );
        return filtered;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(
          error,
          "Failed to fetch customers"
        );
        logger.error(errorMessage, error, true);
        throw error;
      }
    },
    retry: 1,
    enabled: hasAccess,
  });
};

export const useAddCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddCustomerPayload) => {
      const resp = await billingService.addCustomer(payload);
      if (!resp.value) {
        throw new Error("Failed to add customer");
      }
      return resp.value;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      logger.error(
        getErrorMessage(error, "Failed to add customer"),
        error,
        true
      );
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      custCode,
      payload,
    }: {
      custCode: string;
      payload: Partial<BackendCustomerPayload>;
    }) => {
      return { custCode, payload };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      custCode,
      custId,
    }: {
      custCode: string;
      custId?: number | string;
    }) => {
      if (custId && typeof custId === "number") {
        await billingService.deleteCustomer(custId);
      }

      const deletedRaw = localStorage.getItem("deleted_customers");
      const deleted: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
      if (!deleted.includes(custCode)) {
        deleted.push(custCode);
        localStorage.setItem("deleted_customers", JSON.stringify(deleted));
      }
      return custCode;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      logger.error(
        getErrorMessage(error, "Failed to delete customer"),
        error,
        true
      );
    },
  });
};
