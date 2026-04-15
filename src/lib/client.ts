import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosError,
} from "axios";
import { API_BASE_URL } from "@/constants/constdata";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { logger } from "@/utils/logger";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const { useAuthStore } = await import("@/store/user-auth-store");
      const tenantId = useAuthStore.getState().getTenantId();
      if (tenantId) {
        config.headers = config.headers || {};
        config.headers["X-Tenant-ID"] = tenantId;
      } else {
        logger.warn("⚠️ No tenant ID found in store");
      }
    } catch (e) {
      logger.warn("Could not load auth store for tenant header:", e);
    }

    return config;
  },
  (error) => {
    logger.error("Axios request interceptor error", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _skipAuthRedirect?: boolean;
    };

    const resp = error.response;
    const errInfo = resp
      ? { status: resp.status, statusText: resp.statusText, data: resp.data }
      : { message: error.message };
    try {
      logger.error("API Error Response", errInfo);
    } catch {
      logger.error("API Error Response", errInfo);
    }

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (originalRequest._skipAuthRedirect) {
        return Promise.reject(error);
      }

      if (
        originalRequest.url?.includes(API_ENDPOINTS.LOGIN.REFRESH) ||
        originalRequest.url?.includes(API_ENDPOINTS.LOGIN.LOGIN)
      ) {
        if (
          !originalRequest._skipAuthRedirect &&
          !window.location.pathname.includes("/login")
        ) {
          const { useAuthStore } = await import("@/store/user-auth-store");
          useAuthStore.getState().logout();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance.request(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshHeaders: Record<string, string> = {};
        try {
          const { useAuthStore } = await import("@/store/user-auth-store");
          const tenantId = useAuthStore.getState().getTenantId();
          if (tenantId) refreshHeaders["X-Tenant-ID"] = tenantId;
        } catch (e) {
          logger.warn("Could not load auth store for refresh header:", e);
        }

        await axiosInstance.post(API_ENDPOINTS.LOGIN.REFRESH, undefined, {
          headers: refreshHeaders,
        });

        processQueue(null);
        isRefreshing = false;

        return axiosInstance.request(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error);
        isRefreshing = false;

        if (!window.location.pathname.includes("/login")) {
          const { useAuthStore } = await import("@/store/user-auth-store");
          useAuthStore.getState().logout();
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      logger.warn("API access forbidden (403)", errInfo, true);
    }

    return Promise.reject(error);
  }
);

export const apiClient = {
  async request<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await axiosInstance.request<T>({
      url: endpoint,
      ...options,
    });
    return response.data;
  },

  async requestText(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<string> {
    const response = await axiosInstance.request<string>({
      url: endpoint,
      responseType: "text",
      ...options,
    });
    return response.data;
  },

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const response = await axiosInstance.post<T>(endpoint, formData);
    return response.data;
  },

  async uploadPut<T>(endpoint: string, formData: FormData): Promise<T> {
    const response = await axiosInstance.put<T>(endpoint, formData);
    return response.data;
  },
};
