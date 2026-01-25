import type {
  AddCustomerPayload,
  AddCustomerResponse,
  BackendCustomerPayload,
} from "@/types/item.types";
import { apiClient } from "@/lib/client";
import { API_ENDPOINTS } from "@/constants/api.constants";
import type { AttireRent } from "@/types/attireRent.type";
import type { Bill } from "@/types/bill.type";
import { getErrorMessage } from "@/utils/swal";

type AttireRentAddDto = {
  customerCode?: string;
  attireCode: string;
  rentDate?: string;
  returnDate?: string;
};

export const billingService = {
  async addCustomer(data: AddCustomerPayload): Promise<AddCustomerResponse> {
    try {
      const resp = await apiClient.request<BackendCustomerPayload>(
        API_ENDPOINTS.CUSTOMER.ADD,
        {
          method: "POST",
          data,
        }
      );

      return { success: true, value: resp };
    } catch (error: unknown) {
      console.error("❌ Error adding customer:", error);
      throw error;
    }
  },

  async getAllCustomers(): Promise<BackendCustomerPayload[]> {
    try {
      const resp = await apiClient.request<BackendCustomerPayload[]>(
        API_ENDPOINTS.CUSTOMER.GET_ALL
      );
      return resp;
    } catch (error: unknown) {
      console.error("❌ Error fetching customers:", error);
      throw error;
    }
  },

  async deleteCustomer(custId: number): Promise<boolean> {
    try {
      await apiClient.request<void>(API_ENDPOINTS.CUSTOMER.DELETE(custId), {
        method: "DELETE",
      });
      return true;
    } catch (error: unknown) {
      console.error("❌ Error deleting customer:", error);
      throw error;
    }
  },

  async addAttireRent(payload: AttireRentAddDto): Promise<unknown> {
    try {
      const resp = await apiClient.request<unknown>(
        API_ENDPOINTS.ATTIRE_RENT.ADD,
        {
          method: "POST",
          data: payload,
        }
      );
      return resp;
    } catch (error: unknown) {
      console.error("❌ Error adding attire rent:", error);
      throw error;
    }
  },

  async getAllBillings(): Promise<Bill[]> {
    try {
      const resp = await apiClient.request<Bill[]>(
        API_ENDPOINTS.BILLING.GET_ALL
      );
      return resp;
    } catch (error: unknown) {
      console.error("❌ Error fetching billings:", error);
      throw error;
    }
  },

  async getAllAttireRents(): Promise<AttireRent[]> {
    try {
      const resp = await apiClient.request<AttireRent[]>(
        API_ENDPOINTS.ATTIRE_RENT.GET_ALL
      );
      return resp;
    } catch (error: unknown) {
      console.error("❌ Error fetching attire rents:", error);
      throw error;
    }
  },

  async getAttireRentsByBillingCode(billingCode: string): Promise<unknown[]> {
    try {
      const resp = await apiClient.request<unknown[]>(
        `/v1/attire-rent/by-billing/${encodeURIComponent(billingCode)}`
      );
      return resp;
    } catch (error: unknown) {
      console.error("❌ Error fetching attire rents by billing code:", error);
      throw error;
    }
  },

  async createBillingWithRentals(payload: {
    customerCode: string;
    items: Array<{
      attireCode: string;
      rentDate?: string;
      returnDate?: string;
    }>;
  }): Promise<unknown> {
    try {
      return await apiClient.request<unknown>(
        "/v1/billing/create-with-rentals",
        {
          method: "POST",
          data: payload,
        }
      );
    } catch (error: unknown) {
      console.error("❌ Error creating billing with rentals:", error);
      throw error;
    }
  },

  async createBillingAndPay(payload: {
    customerCode: string;
    items: Array<{
      attireCode: string;
      rentDate?: string;
      returnDate?: string;
    }>;
    discountPercentage?: number;
    paymentMethod?: string;
  }): Promise<unknown> {
    try {
      return await apiClient.request<unknown>("/v1/billing/create-and-pay", {
        method: "POST",
        data: payload,
      });
    } catch (error: unknown) {
      console.error("❌ Error creating billing and pay:", error);
      throw error;
    }
  },

  async payBilling(payload: {
    billingCode: string;
    discountPercentage?: number;
    paymentMethod?: string;
  }): Promise<unknown> {
    try {
      return await apiClient.request<unknown>("/v1/billing/pay", {
        method: "POST",
        data: payload,
      });
    } catch (error: unknown) {
      console.error("❌ Error paying billing:", error);
      throw error;
    }
  },
};
