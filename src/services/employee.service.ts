import { z } from "zod";
import { apiClient } from "@/lib/client";
import type { Employee,EmployeeCreateInput } from "@/types/employee.type";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { EmployeeSchema } from "@/schemas/employee.schema";


export const employeeService = {

  async getAll(): Promise<Employee[]> {
    const response = await apiClient.request<Employee[]>(API_ENDPOINTS.EMPLOYEE.GET_ALL,
      { method: "GET"}
    );
    return z.array(EmployeeSchema).parse(response);
  },

  async getByEmpCode(empCode: string): Promise<Employee> {
    const response = await apiClient.request<Employee>(API_ENDPOINTS.EMPLOYEE.GET_BY_CODE(empCode), 
    {method: "GET"}
    );
    return EmployeeSchema.parse(response);
  },

  async updateEmployee(
    empCode: string,
    data: Partial<Employee>
  ): Promise<Employee> {
    const response = await apiClient.request<Employee>(
      API_ENDPOINTS.EMPLOYEE.UPDATE(empCode),
      {
        method: "PUT",
        data,
      }
    );

    return EmployeeSchema.parse(response);
  },

  async addEmployee(data: Partial<EmployeeCreateInput>): Promise<Employee> {
    const response = await apiClient.request<Employee>(API_ENDPOINTS.EMPLOYEE.ADD, 
    {
      method: "POST",
      data
    }
  );
    return EmployeeSchema.parse(response);
  },

   async deleteEmployee(empCode: string): Promise<void> {
    await apiClient.request<void>(
      API_ENDPOINTS.EMPLOYEE.DELETE(empCode),
      { method: "DELETE" }
    );
  },
};
