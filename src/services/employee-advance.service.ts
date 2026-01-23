import { apiClient } from "@/lib/client";
import type {
  AdvancePaymentRequest,
  AdvancePaymentResponse,
} from "@/types/advance-payment.type";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { AdvancePaymentResponseSchema } from "@/schemas/advance-payment.schema";
import { getMonthDateRange } from "@/utils/date";

export const employeeAdvanceService = {
  async addAdvancePayment(
    data: Partial<AdvancePaymentRequest>
  ): Promise<AdvancePaymentResponse> {
    const response = await apiClient.request<AdvancePaymentRequest>(
      API_ENDPOINTS.EMPLOYEE_ADVANCE_PAYMENT.ADD,
      {
        method: "POST",
        data,
      }
    );
    return AdvancePaymentResponseSchema.parse(response);
  },

  async getByEmployeeDateRange(
    id: number,
    year: string,
    month: string
  ): Promise<AdvancePaymentResponse[]> {
    const { startDate, endDate } = getMonthDateRange(
      Number(year),
      Number(month)
    );
    const response = await apiClient.request<AdvancePaymentResponse[]>(
      API_ENDPOINTS.EMPLOYEE_ADVANCE_PAYMENT.GET_BY_DATE_RANGE_EMPLOYEE(
        id,
        startDate,
        endDate
      ),
      { method: "GET" }
    );
    return response.map((item) => AdvancePaymentResponseSchema.parse(item));
  },

  async deleteAdvancePayment(id: number): Promise<void> {
    await apiClient.request<void>(
      API_ENDPOINTS.EMPLOYEE_ADVANCE_PAYMENT.DELETE(id),
      { method: "DELETE" }
    );
  },

  async updateAdvancePayment(
    id: number,
    data: Partial<AdvancePaymentRequest>
  ): Promise<AdvancePaymentResponse> {
    const response = await apiClient.request<AdvancePaymentRequest>(
      API_ENDPOINTS.EMPLOYEE_ADVANCE_PAYMENT.UPDATE(id),
      {
        method: "PUT",
        data,
      }
    );
    return AdvancePaymentResponseSchema.parse(response);
  },
};
