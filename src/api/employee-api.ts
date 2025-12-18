import { apiClient } from "./client";
import { API_ENDPOINTS } from "@/constants/api.constants";
import type { Employee } from "@/types/employee.type";
//import { useAuthStore } from "@/store/user-auth-store";


 //const token = useAuthStore.getState().token;
 const tenantId = "t_1";

  export const getAllEmployees =  () =>
    apiClient.request<Employee[]>(API_ENDPOINTS.EMPLOYEE.GET_ALL,{
      method: "GET",
      headers: {
        //Authorization: `Bearer ${token}`,
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
    });

  export const getEmployeeByCode = (code: string) =>
    apiClient.request<Employee>(API_ENDPOINTS.EMPLOYEE.GET_BY_CODE(code.toString()),
      {
        method: "GET",
        headers: {
          //Authorization: `Bearer ${token}`,
          "X-Tenant-ID": tenantId,
          "Content-Type": "application/json",
        },
      }
);

  export const addEmployee = (employeeData: Partial<Employee>) =>
    apiClient.request<Employee>(API_ENDPOINTS.EMPLOYEE.ADD, {
      method: "POST",
      headers: {
        //Authorization: `Bearer ${token}`,
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

  export const updateEmployee = (code: string, employeeData: Partial<Employee> | undefined) =>
    apiClient.request<Employee>(API_ENDPOINTS.EMPLOYEE.UPDATE(code), {
      method: "PUT",
      headers: {
        //Authorization: `Bearer ${token}`,
        "X-Tenant-ID": "t_1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

  export const deleteEmployee = (id: number) =>
    apiClient.request<void>(API_ENDPOINTS.EMPLOYEE.DELETE(id), {
      method: "DELETE",
      headers: {
        //Authorization: `Bearer ${token}`,
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      }, 
    });