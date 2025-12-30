import type {
  AddCustomerPayload,
  AddCustomerResponse,
  BackendCustomerPayload,
} from "@/types/item.types";
import { apiClient } from "@/lib/client";
import { API_ENDPOINTS } from "@/constants/api.constants";

type AttireRentAddDto = {
  customerCode?: string;
  attireCode: string;
  rentDate?: string;
  returnDate?: string;
};

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

  async deleteCustomer(custId: number): Promise<boolean> {
    await apiClient.request<void>(API_ENDPOINTS.CUSTOMER.DELETE(custId), {
      method: "DELETE",
    });
    return true;
  },

  async addAttireRent(payload: AttireRentAddDto): Promise<unknown> {
    const resp = await apiClient.request<unknown>(
      API_ENDPOINTS.ATTIRE_RENT.ADD,
      {
        method: "POST",
        data: payload,
      }
    );
    return resp;
  },

  async createBillingWithRentals(payload: {
    customerCode: string;
    items: Array<{
      attireCode: string;
      rentDate?: string;
      returnDate?: string;
    }>;
  }): Promise<unknown> {
    return await apiClient.request<unknown>(
      "/v1/billing/create-with-rentals", // or whatever endpoint
      { method: "POST", data: payload }
    );
  },
  async payBilling(payload: {
    billingCode: string;
    discountPercentage?: number;
    paymentMethod?: string;
  }): Promise<unknown> {
    return await apiClient.request<unknown>("/v1/billing/pay", {
      method: "POST",
      data: payload,
    });
  },
};
