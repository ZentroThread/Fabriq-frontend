import { apiClient } from "@/api/client";
import { API_ENDPOINTS } from "@/constants/api.constants";
import {type PayRollResponseType} from "@/types/payroll-type";
import { payRollResponseSchema } from "@/schemas/payroll.schema";

const tenantId = "t_1";

export const payrollService = {

  async generatePayroll(empId:number,month:number,year:number): Promise<PayRollResponseType> {
    const response = await apiClient.request<PayRollResponseType>(API_ENDPOINTS.PAYROLL.GENERATE(empId,month,year), 
    {
      method: "GET",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
    });
    return payRollResponseSchema.parse(response);
  },
}