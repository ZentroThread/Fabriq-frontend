import type {
  AddCustomerPayload,
  AddCustomerResponse,
  BackendCustomerPayload,
} from "@/types/item.types";
import { apiClient } from "@/lib/client";
import { API_ENDPOINTS } from "@/constants/api.constants";
import type { AttireRent } from "@/types/attireRent.type";
import { z } from "zod";
import { billingSchema } from "@/schemas/bill-data.schema";
import { logger } from "@/utils/logger";

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

  async getAllBillings(): Promise<z.infer<typeof billingSchema>[]> {
    try {
      const resp = await apiClient.request<unknown>(
        API_ENDPOINTS.BILLING.GET_ALL
      );
      return z.array(billingSchema).parse(resp);
    } catch (error: unknown) {
      logger.error("Failed to fetch billings", error, true);
      throw error;
    }
  },

  async getAllAttireRents(): Promise<AttireRent[]> {
    const resp = await apiClient.request<AttireRent[]>(
      API_ENDPOINTS.ATTIRE_RENT.GET_ALL
    );
    return resp;
  },

  async getAttireRentsByBillingCode(billingCode: string): Promise<unknown[]> {
    try {
      const resp = await apiClient.request<unknown[]>(
        API_ENDPOINTS.ATTIRE_RENT.GET_BY_BILLING_CODE(billingCode)
      );
      return resp;
    } catch (error: unknown) {
      logger.error("Failed to fetch attire rents by billing code", error, true);
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
    return await apiClient.request<unknown>(
      API_ENDPOINTS.BILLING.CREATE_WITH_RENTALS,
      {
        method: "POST",
        data: payload,
      }
    );
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
    return await apiClient.request<unknown>(
      API_ENDPOINTS.BILLING.CREATE_AND_PAY,
      {
        method: "POST",
        data: payload,
      }
    );
  },

  async payBilling(payload: {
    billingCode: string;
    discountPercentage?: number;
    paymentMethod?: string;
  }): Promise<unknown> {
    return await apiClient.request<unknown>(API_ENDPOINTS.BILLING.PAY, {
      method: "POST",
      data: payload,
    });
  },
};
