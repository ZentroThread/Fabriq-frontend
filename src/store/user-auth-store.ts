import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types/types";
import { isTokenExpired } from "@/lib/jwt";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Getters
  isAuthenticated: () => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  getTenantId: () => string | null;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setAuth: (user, token) => {
        // Validate token before setting
        if (isTokenExpired(token)) {
          set({ user: null, token: null, error: "Token expired" });
          return;
        }
        set({ user, token, error: null });
      },

      logout: () => {
        set({ user: null, token: null, error: null });
        // Clear any other cached data if needed
        localStorage.removeItem("auth-storage");
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      isAuthenticated: () => {
        const { token } = get();
        if (!token) return false;

        // Check if token is expired
        if (isTokenExpired(token)) {
          get().logout();
          return false;
        }

        return true;
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
        const { user } = get();
        return user?.tenantId || null;
      },

      getToken: () => {
        const { token } = get();
        if (!token || isTokenExpired(token)) {
          get().logout();
          return null;
        }
        return token;
      },
    }),
    {
      name: "auth-storage",
      // Only persist essential data
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
