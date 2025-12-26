import { apiClient } from "@/api/client";
import type { AdvancePaymentRequest, AdvancePaymentResponse } from "@/types/advance-payment.type";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { AdvancePaymentResponseSchema } from "@/schemas/advance-payment.schema";

const tenantId = "t_1";

export const employeeAdvanceService = {

  async addAdvancePayment(data: Partial<AdvancePaymentRequest>): Promise<AdvancePaymentResponse> {
    const response = await apiClient.request<AdvancePaymentRequest>(API_ENDPOINTS.EMPLOYEE_ADVANCE_PAYMENT.ADD, 
    {
      method: "POST",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return AdvancePaymentResponseSchema.parse(response);
  }

}