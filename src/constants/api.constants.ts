

export const API_ENDPOINTS = {
  ATTIRE: {
    ADD: "/v1/attire/add",
    GET_ALL: "/v1/attire/all",
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
  },
  ATTIRE_RENT: {
    ADD: "/v1/attire-rent/add",
    GET_ALL: "/v1/attire-rent/all",
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
    GET_BY_CODE: (code: string ) => `/v1/employees/${code}`,
  },

  EMPLOYEE_PRODUCTION: {
    ADD: "/v1/production-records",
    GET_ALL: "/v1/production-records",
    GET_BY_EMPLOYEE: (id: number) => `/v1/production-records/employee/${id}`,
    GET_BY_DATE_RANGE: (startDate: string, endDate: string) =>
      `/v1/production-records/date-range?startDate=${startDate}&endDate=${endDate}`,
    GET_BY_DATE_RANGE_EMPLOYEE: (id: number, startDate: string, endDate: string) =>
      `/v1/production-records/employee/${id}/date-range?startDate=${startDate}&endDate=${endDate}`,
    DELETE: (id: number) => `/v1/production-records/${id}`,
    UPDATE: (id: number) => `/v1/production-records/${id}`,
  },
};
