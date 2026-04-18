import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LoginInput, User, UserRole } from "@/types/types";
import { queryClient } from "@/main";
import { loginService } from "@/services/login.service";
import { logger } from "@/utils/logger";
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  tokenExpiryTime: number | null;
  isAuthChecked: boolean;
  tenantId: string | null;

  setTenantId: (id: string | null) => void;
  login: (
    credentials: LoginInput
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  validateSession: () => Promise<boolean>;
  initializeAuth: () => Promise<void>;
  setAuthChecked: (checked: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  isAuthenticated: () => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  getTenantId: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      tokenExpiryTime: null,
      isAuthChecked: false,
      tenantId:
        typeof window !== "undefined" ? localStorage.getItem("tenantId") : null,

      initializeAuth: async () => {
        set({ isLoading: false });

        try {
          const user = await loginService.getUserProfile({
            _skipAuthRedirect: true,
            _retry: true,
          });
          const currentTenantId = get().tenantId || user?.tenantId || null;

          set({
            user,
            isLoading: false,
            isAuthChecked: true,
            tenantId: currentTenantId,
          });
        } catch {
          set({
            user: null,
            isLoading: false,
            isAuthChecked: true,
            tenantId: null,
          });
        }
      },

      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          const tokenResponse = await loginService.login(credentials);

          const user = await loginService.getUserProfile({});

          const currentTenantId = get().tenantId || user?.tenantId || null;

          const expiryTime = Date.now() + tokenResponse.accessTokenExpiresIn;

          set({
            user,
            isLoading: false,
            tokenExpiryTime: expiryTime,
            tenantId: currentTenantId,
          });

          return { success: true };
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Login failed";
          set({
            error: message,
            isLoading: false,
            user: null,
            tokenExpiryTime: null,
            tenantId: null,
          });
          localStorage.removeItem("tenantId");
          return { success: false, error: message };
        }
      },

      logout: async () => {
        try {
          await loginService.logout();
        } catch (error) {
          logger.error("Logout API call failed:", error);
        }

        await queryClient.cancelQueries();
        queryClient.clear();

        localStorage.removeItem("tenantId");
        localStorage.removeItem("fabriq_chat_messages");

        set({ user: null, error: null, tokenExpiryTime: null, tenantId: null });
      },

      validateSession: async () => {
        const { user } = get();
        if (!user) return false;

        set({ isLoading: true });

        try {
          const freshUser = await loginService.getUserProfile({});

          const currentTenantId = get().tenantId || freshUser?.tenantId || null;

          set({
            user: freshUser,
            isLoading: false,
            tenantId: currentTenantId,
          });
          return true;
        } catch {
          await get().logout();
          return false;
        }
      },

      setAuthChecked: (checked: boolean) => set({ isAuthChecked: checked }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      isAuthenticated: () => {
        return get().user !== null;
      },

      hasRole: (role) => {
        const { user } = get();
        if (!user) return false;

        if (Array.isArray(role)) {
          return role.includes(user.role);
        }

        return user.role === role;
      },

      getTenantId: () => {
        const stateTenantId = get().tenantId;
        const userTenantId = get().user?.tenantId;
        const localStorageTenantId =
          typeof window !== "undefined"
            ? localStorage.getItem("tenantId")
            : null;

        const tenantId = stateTenantId ?? userTenantId ?? localStorageTenantId;

        return tenantId;
      },

      setTenantId: (id) => {
        set({ tenantId: id });
        if (id) {
          localStorage.setItem("tenantId", id);
        } else {
          localStorage.removeItem("tenantId");
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tenantId: state.tenantId }),
    }
  )
);
