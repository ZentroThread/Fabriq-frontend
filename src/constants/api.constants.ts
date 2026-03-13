export const API_ENDPOINTS = {
  ATTIRE: {
    ADD: "/v1/attire/add",
    GET_ALL: "/v1/attire/all",
    RESERVE: "/v1/attire/reserve",
    UNRESERVE: "/v1/attire/unreserve",
    DELETE: (id: number) => `/v1/attire/delete/${id}`,
    UPDATE: (id: number) => `/v1/attire/update/${id}`,
  },
  CUSTOMER: {
    ADD: "/v1/customer/add-customer",
    GET_ALL: "/v1/customer/read-customers",
    DELETE: (id: number) => `/v1/customer/delete-customer/${id}`,
  },
  LOGIN: {
    REGISTER: "/v1/user/register",
    LOGIN: "/v1/user/login",
    LOGOUT: "/v1/user/logout",
    GETCURRENTUSER: "/v1/user/me",
    REFRESH: "/v1/user/refresh",
    CHANGE_PASSWORD: "/v1/user/change-password",
  },
  ATTIRE_RENT: {
    ADD: "/v1/attire-rent/add",
    GET_ALL: "/v1/attire-rent/all",
  },
  ATTIRE_CATEGORY: {
    GET_ALL: "/v1/category/all",
  },

  BILLING: {
    GET_ALL: "/v1/billing/all",
  },
  // Add more endpoints...

  EMPLOYEE: {
    ADD: "/v1/employees",
    GET_ALL: "/v1/employees",
    DELETE: (code: string) => `/v1/employees/${code}`,
    UPDATE: (code: string) => `/v1/employees/${code}`,
    GET_BY_CODE: (code: string) => `/v1/employees/${code}`,
  },

  EMPLOYEE_PRODUCTION: {
    ADD: "/v1/production-records",
    GET_ALL: "/v1/production-records",
    GET_BY_EMPLOYEE: (id: number) => `/v1/production-records/employee/${id}`,
    GET_BY_DATE_RANGE: (startDate: string, endDate: string) =>
      `/v1/production-records/date-range?startDate=${startDate}&endDate=${endDate}`,
    GET_BY_DATE_RANGE_EMPLOYEE: (
      id: number,
      startDate: string,
      endDate: string
    ) =>
      `/v1/production-records/employee/${id}/date-range?startDate=${startDate}&endDate=${endDate}`,
    DELETE: (id: number) => `/v1/production-records/${id}`,
    UPDATE: (id: number) => `/v1/production-records/${id}`,
  },

  EMPLOYEE_ADVANCE_PAYMENT: {
    ADD: "/v1/advance-payments",
    GET_ALL: "/v1/advance-payments",
    GET_BY_EMPLOYEE: (id: number) => `/v1/advance-payments/employee/${id}`,
    GET_BY_DATE_RANGE_EMPLOYEE: (
      id: number,
      startDate: string,
      endDate: string
    ) =>
      `/v1/advance-payments/employee/${id}/date-range?startDate=${startDate}&endDate=${endDate}`,
    DELETE: (id: number) => `/v1/advance-payments/${id}`,
    UPDATE: (id: number) => `/v1/advance-payments/${id}`,
  },

  PAYROLL: {
    GENERATE: (empId: number, month: number, year: number) =>
      `/v1/payroll/calculate/${empId}/${month}/${year}`,
    GET_RECORD: (empId: number, year: number) => `/v1/payroll/${empId}/${year}`,
    CONFIRM: (empId: number, month: number, year: number) =>
      `/v1/payroll/confirm/${empId}/${month}/${year}`,
    EPF_RECORD: (month: number, year: number) =>
      `/v1/payroll/epf-record/${month}/${year}`,
    ETF_RECORD: (month: number, year: number) =>
      `/v1/payroll/etf-record/${month}/${year}`,
    PRINT_PAYSLIP: (
      tenantId: string,
      empId: number,
      month: number,
      year: number
    ) => `/v1/payroll/payslip/print/${tenantId}/${empId}/${month}/${year}`,
  },

  DEVICE_ATTENDANCE_LOG: {
    GET_TODAY_LOGS: "/v1/device-attendance/today",
  },

  ATTENDANCE: {
    GET_DAILY_ATTENDANCE: (date: string) => `/v1/attendance/date?date=${date}`,
  },

  RAG: {
    CHAT: "/api/chat",
    BACKEND_CHAT: "/v1/rag/chat"
  },
};
