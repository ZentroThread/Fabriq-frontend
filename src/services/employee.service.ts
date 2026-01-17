import { z } from "zod";
import { apiClient } from "@/lib/client";
import type { Employee, EmployeeCreateInput } from "@/types/employee.type";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { EmployeeSchema } from "@/schemas/employee.schema";

type FormDataPrimitive = string | number | boolean | File | null | undefined;

type FormDataValue =
  | FormDataPrimitive
  | FormDataValue[]
  | { [key: string]: FormDataValue };

function appendFormData(
  formData: FormData,
  data: Record<string, FormDataValue>,
  parentKey?: string
) {
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    const formKey = parentKey ? `${parentKey}.${key}` : key;

    if (value instanceof File) {
      formData.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendFormData(formData, { [index]: item }, formKey);
      });
    } else if (typeof value === "object") {
      appendFormData(formData, value, formKey);
    } else {
      formData.append(formKey, String(value));
    }
  });
}

export const employeeService = {
  async getAll(): Promise<Employee[]> {
    const response = await apiClient.request<Employee[]>(
      API_ENDPOINTS.EMPLOYEE.GET_ALL,
      { method: "GET" }
    );
    return z.array(EmployeeSchema).parse(response);
  },

  async getByEmpCode(empCode: string): Promise<Employee> {
    const response = await apiClient.request<Employee>(
      API_ENDPOINTS.EMPLOYEE.GET_BY_CODE(empCode),
      { method: "GET" }
    );
    return EmployeeSchema.parse(response);
  },

  async addEmployee(
    data: Partial<EmployeeCreateInput>,
    image?: File
  ): Promise<Employee> {
    const formData = new FormData();
    appendFormData(formData, data);
    if (image) formData.append("image", image);

    const response = await apiClient.upload<Employee>(
      API_ENDPOINTS.EMPLOYEE.ADD,
      formData
    );

    return EmployeeSchema.parse(response);
  },

  async updateEmployee(
    empCode: string,
    data: Partial<Employee>,
    image?: File
  ): Promise<Employee> {
    const formData = new FormData();
    appendFormData(formData, data);
    if (image) formData.append("image", image);

    const response = await apiClient.uploadPut<Employee>(
      API_ENDPOINTS.EMPLOYEE.UPDATE(empCode),
      formData
    );

    return EmployeeSchema.parse(response);
  },
  async deleteEmployee(empCode: string): Promise<void> {
    await apiClient.request<void>(API_ENDPOINTS.EMPLOYEE.DELETE(empCode), {
      method: "DELETE",
    });
  },
};
