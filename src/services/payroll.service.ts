import { apiClient } from "@/lib/client";
import { API_ENDPOINTS } from "@/constants/api.constants";
import type { EPFFormType, PayRollResponseType,  PayrollRecordResponseType, ETFFormType} from "@/types/payroll-type";
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

  async getEpfRecord(month:number,year:number): Promise<EPFFormType[]> {
    const response = await apiClient.request<EPFFormType[]>(API_ENDPOINTS.PAYROLL.EPF_RECORD(month,year), 
    {method: "GET"});
    return response;
  },

  async getEtfRecord(month:number,year:number): Promise<ETFFormType[]> {
    const response = await apiClient.request<ETFFormType[]>(API_ENDPOINTS.PAYROLL.ETF_RECORD(month,year), 
    {method: "GET"});
    return response;
  },
}