import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginInput, User, UserRole } from "@/types/types";
import { queryClient } from "@/main";
import { loginService } from "@/services/login.service";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  tokenExpiryTime: number | null; // Store access token expiry time

  login: (
    credentials: LoginInput
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  validateSession: () => Promise<boolean>;
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

      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          // Step 1: Login (sets HttpOnly cookies and returns token info)
          const tokenResponse = await loginService.login(credentials);

          // Step 2: Fetch user profile using the cookie
          const user = await loginService.getUserProfile();

          // Calculate and store token expiry time
          const expiryTime = Date.now() + tokenResponse.accessTokenExpiresIn;

          set({ user, isLoading: false, tokenExpiryTime: expiryTime });
          return { success: true };
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Login failed";
          set({
            error: message,
            isLoading: false,
            user: null,
            tokenExpiryTime: null,
          });
          return { success: false, error: message };
        }
      },

      //setUser: (user) => set({ user }),

      logout: async () => {
        try {
          await loginService.logout();
        } catch (error) {
          console.error("Logout API call failed:", error);
        }

        await queryClient.cancelQueries();
        queryClient.clear();

        set({ user: null, error: null, tokenExpiryTime: null });
        localStorage.removeItem("auth-storage");
        sessionStorage.clear();
      },

      validateSession: async () => {
        const { user } = get();
        if (!user) return false;

        set({ isLoading: true });

        try {
          // Use service instead of fetch
          const freshUser = await loginService.getUserProfile();
          set({ user: freshUser, isLoading: false });
          return true;
        } catch {
          await get().logout();
          return false;
        }
      },

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

        //return user.role === role;
        return Array.isArray(role)
          ? role.includes(user.role)
          : user.role === role;
      },

      getTenantId: () => {
        return get().user?.tenantId || null;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        tokenExpiryTime: state.tokenExpiryTime,
      }),
    }
  )
);
