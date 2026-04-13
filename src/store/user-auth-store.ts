import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LoginInput, User, UserRole } from "@/types/types";
import { queryClient } from "@/main";
import { loginService } from "@/services/login.service";
import { extractTenantId } from "@/lib/jwt";

/**
 * Helper: Extract tenant ID from access token cookie and persist it
 */
const extractAndPersistTenantId = (): string | null => {
  try {
    // Get access token from cookies
    const cookies = document.cookie.split(";");
    const accessTokenCookie = cookies.find((c) =>
      c.trim().startsWith("accessToken=")
    );

    if (!accessTokenCookie) {
      console.warn("⚠️ No accessToken cookie found");
      return null;
    }

    const token = accessTokenCookie.split("=")[1];
    const tenantId = extractTenantId(token);

    if (tenantId) {
      localStorage.setItem("tenantId", tenantId);
      return tenantId;
    } else {
      console.warn("⚠️ No tenant ID in JWT token");
      return null;
    }
  } catch (error) {
    console.error("❌ Failed to extract tenant ID from token:", error);
    return null;
  }
};

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
  initializeAuth: () => Promise<void>; // Add this
  setAuthChecked: (checked: boolean) => void; // Add this
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
        // Skip loading state for silent auth check on mount
        set({ isLoading: false });

        try {
          // Silently check for existing session
          // This flag prevents redirect and retry logic
          const user = await loginService.getUserProfile({
            _skipAuthRedirect: true,
            _retry: true, // Mark as already retried to prevent refresh attempt
          });

          // Extract tenant ID from JWT in cookie and persist it
          const tenantId =
            extractAndPersistTenantId() || user?.tenantId || null;


          set({
            user,
            isLoading: false,
            isAuthChecked: true,
            tenantId,
          });
        } catch {
          // No valid session - this is expected on initial load
          // Fail silently without errors
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

          // Extract tenant ID from JWT token in cookie and persist it
          const tenantId =
            extractAndPersistTenantId() || user?.tenantId || null;

          const expiryTime = Date.now() + tokenResponse.accessTokenExpiresIn;

          set({
            user,
            isLoading: false,
            tokenExpiryTime: expiryTime,
            tenantId,
          });

          return { success: true };
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Login failed";
          console.error("❌ Login failed:", message);
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
          console.error("Logout API call failed:", error);
        }

        await queryClient.cancelQueries();
        queryClient.clear();

        // Clear tenant ID from localStorage
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

          // Extract tenant ID from JWT and persist
          const tenantId =
            extractAndPersistTenantId() || freshUser?.tenantId || null;

          set({
            user: freshUser,
            isLoading: false,
            tenantId,
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
