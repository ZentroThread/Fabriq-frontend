import { z } from "zod";
import { apiClient } from "@/api/client";
import type { Employee,EmployeeCreateInput } from "@/types/employee.type";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { EmployeeSchema } from "@/schemas/employee.schema";


const tenantId = "t_1";

export const employeeService = {

  async getAll(): Promise<Employee[]> {
    const response = await apiClient.request<Employee[]>(API_ENDPOINTS.EMPLOYEE.GET_ALL,
      {
          method: "GET",
          headers: {
            "X-Tenant-ID": tenantId,
            "Content-Type": "application/json",
          },
        });
    return z.array(EmployeeSchema).parse(response);
  },

  async getByEmpCode(empCode: string): Promise<Employee> {
    const response = await apiClient.request<Employee>(API_ENDPOINTS.EMPLOYEE.GET_BY_CODE(empCode), 
    {
      method: "GET",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
    });
    return EmployeeSchema.parse(response);
  },

  async updateEmployee(empCode: string, data: Partial<Employee>): Promise<Employee> {
    const response = await apiClient.request<Employee>(API_ENDPOINTS.EMPLOYEE.UPDATE(empCode), 
    {
      method: "PUT",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return EmployeeSchema.parse(response);
  },

  async addEmployee(data: Partial<EmployeeCreateInput>): Promise<Employee> {
    const response = await apiClient.request<Employee>(API_ENDPOINTS.EMPLOYEE.ADD, 
    {
      method: "POST",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return EmployeeSchema.parse(response);
  },

  async deleteEmployee(empCode: string): Promise<void> {
    return await apiClient.request<void>(API_ENDPOINTS.EMPLOYEE.DELETE(empCode), 
    {
      method: "DELETE",
      headers: {
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
    }); 
  }
};
