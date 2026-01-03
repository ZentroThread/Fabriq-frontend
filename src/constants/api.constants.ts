export const API_ENDPOINTS = {
  ATTIRE: {
    ADD: "/v1/attire/add",
    GET_ALL: "/v1/attire/all",
    RESERVE: '/v1/attire/reserve',
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
};
