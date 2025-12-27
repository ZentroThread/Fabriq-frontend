import type {
  AddCustomerPayload,
  AddCustomerResponse,
  BackendCustomerPayload,
} from "@/types/item.types";
import { apiClient } from "@/lib/client";
import { API_ENDPOINTS } from "@/constants/api.constants";

export const billingService = {
  async addCustomer(data: AddCustomerPayload): Promise<AddCustomerResponse> {
    const resp = await apiClient.request<BackendCustomerPayload>(
      API_ENDPOINTS.CUSTOMER.ADD,
      {
        method: "POST",
        data,
      }
    );

    return { success: true, value: resp };
  },

  async getAllCustomers(): Promise<BackendCustomerPayload[]> {
    const resp = await apiClient.request<BackendCustomerPayload[]>(
      API_ENDPOINTS.CUSTOMER.GET_ALL
    );
    return resp;
  },
};
