import { apiClient } from "@/lib/client";
import { API_ENDPOINTS } from "@/constants/api.constants";
import type { EPFFormType, PayRollResponseType,  PayrollRecordResponseType, ETFFormType} from "@/types/payroll-type";
import { payRollResponseSchema, payrollRecordResponseSchema } from "@/schemas/payroll.schema";
import  {API_BASE_URL}  from "@/constants/constdata";
import { useAuthStore } from "@/store/user-auth-store";

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

export const printPayslip = (empId:number, month:number, year:number) => {
  const tenantId = useAuthStore.getState().tenantId;
  if (!tenantId) {
    console.error("Tenant ID is not available");
    return;
  }
  const url = `${API_BASE_URL}${API_ENDPOINTS.PAYROLL.PRINT_PAYSLIP(tenantId, empId, month, year)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};