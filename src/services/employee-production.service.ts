import { z } from "zod";
import { apiClient } from "@/api/client";
import type { EmployeeProductionRequest, EmployeeProductionResponse } from "@/types/employee-product.type";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { EmployeeProductionRequestSchema, EmployeeProductionResponseSchema } from "@/schemas/employee-production.schema";
import {getMonthDateRange} from "@/utils/date";

const tenantId = "t_1";

export const employeeProductionService = {

  async getAll(): Promise<EmployeeProductionResponse[]> {
    const response = await apiClient.request<EmployeeProductionResponse[]>(API_ENDPOINTS.EMPLOYEE_PRODUCTION.GET_ALL,
      {
          method: "GET",
          headers: {
            "X-Tenant-ID": tenantId,
            "Content-Type": "application/json",
          },
        });
    return z.array(EmployeeProductionResponseSchema).parse(response);
  },

  async getByEmployee(id: number): Promise<EmployeeProductionResponse[]> {
    const response = await apiClient.request<EmployeeProductionResponse[]>(API_ENDPOINTS.EMPLOYEE_PRODUCTION.GET_BY_EMPLOYEE(id), 
    {
      method: "GET",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
    });
    return z.array(EmployeeProductionResponseSchema).parse(response);
  },

  async addProductionRecord(data: Partial<EmployeeProductionRequest>): Promise<EmployeeProductionRequest> {
    const response = await apiClient.request<EmployeeProductionRequest>(API_ENDPOINTS.EMPLOYEE_PRODUCTION.ADD, 
    {
      method: "POST",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return EmployeeProductionRequestSchema.parse(response);
  },

  async updateProductionRecord(id: number, data: Partial<EmployeeProductionRequest>): Promise<EmployeeProductionResponse> {
    const response = await apiClient.request<EmployeeProductionRequest>(API_ENDPOINTS.EMPLOYEE_PRODUCTION.UPDATE(id), 
    {
      method: "PUT",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return EmployeeProductionResponseSchema.parse(response);
  },

  async deleteProductionRecord(id: number): Promise<void> {
    await apiClient.request<void>(API_ENDPOINTS.EMPLOYEE_PRODUCTION.DELETE(id), 
    {
      method: "DELETE",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
    });
  },

  async getByDateRange(startDate: string, endDate: string): Promise<EmployeeProductionResponse[]> {
    const response = await apiClient.request<EmployeeProductionResponse[]>(API_ENDPOINTS.EMPLOYEE_PRODUCTION.GET_BY_DATE_RANGE(startDate, endDate), 
    {
      method: "GET",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
    });
    return z.array(EmployeeProductionResponseSchema).parse(response);
  },
  
  async getByDateRangeAndEmployee(id: number, year: string, month: string): Promise<EmployeeProductionResponse[]> {
    const {startDate, endDate} = getMonthDateRange(Number(year), Number(month));  
    const response = await apiClient.request<EmployeeProductionResponse[]>(API_ENDPOINTS.EMPLOYEE_PRODUCTION.GET_BY_DATE_RANGE_EMPLOYEE(id, startDate, endDate), 
    {
      method: "GET",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
    });
    return z.array(EmployeeProductionResponseSchema).parse(response);
  },

}