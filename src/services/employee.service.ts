import { z } from "zod";
import { apiClient } from "@/api/client";
import type { Employee } from "@/types/employee.type";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { EmployeeSchema } from "@/schemas/employee.schema";


const tenantId = "t_1";

export const employeeService = {

  async getAll(): Promise<Employee[]> {
    const response = await apiClient.request<Employee[]>(API_ENDPOINTS.EMPLOYEE.GET_ALL,{
          method: "GET",
          headers: {
            "X-Tenant-ID": tenantId,
            "Content-Type": "application/json",
          },
        });
    return z.array(EmployeeSchema).parse(response);
  }
};
