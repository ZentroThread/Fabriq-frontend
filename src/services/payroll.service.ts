import { apiClient } from "@/lib/client";
import { API_ENDPOINTS } from "@/constants/api.constants";
import {type PayRollResponseType, type PayrollRecordResponseType} from "@/types/payroll-type";
import { payRollResponseSchema, payrollRecordResponseSchema } from "@/schemas/payroll.schema";

export const payrollService = {

  async generatePayroll(empId:number,month:number,year:number): Promise<PayRollResponseType> {
    const response = await apiClient.request<PayRollResponseType>(API_ENDPOINTS.PAYROLL.GENERATE(empId,month,year), 
    {method: "GET"});
    return payRollResponseSchema.parse(response);
  },

  async getPayrollRecord(empId:number,year:number): Promise<PayrollRecordResponseType[]> {
    const response = await apiClient.request<PayrollRecordResponseType[]>(API_ENDPOINTS.PAYROLL.GET_RECORD(empId,year), 
    {method: "GET"});
    return payrollRecordResponseSchema.array().parse(response);
  },

  async confirmPayroll(empId:number,month:number,year:number): Promise<void> {
    await apiClient.request<void>(API_ENDPOINTS.PAYROLL.CONFIRM(empId,month,year), 
    {method: "POST"});
  },
}