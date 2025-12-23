

export const API_ENDPOINTS = {
  ATTIRE: {
    ADD: "/v1/attire/add",
    GET_ALL: "/v1/attire/all",
    DELETE: (id: number) => `/v1/attire/delete/${id}`,
    UPDATE: (id: number) => `/v1/attire/update/${id}`,
  },
  CUSTOMER: {
    ADD: "/v1/customer/add-customer",
    GET_ALL: "/v1/customer/rea-customers",
  },
  // Add more endpoints...

  EMPLOYEE: {
    ADD: "/v1/employees",
    GET_ALL: "/v1/employees",
    DELETE: (code: String) => `/v1/employees/${code}`,
    UPDATE: (code: string) => `/v1/employees/${code}`,
    GET_BY_CODE: (code: string ) => `/v1/employees/${code}`,
  },
};
