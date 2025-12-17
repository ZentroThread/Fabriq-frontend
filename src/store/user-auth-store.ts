import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types/types";
import { API_BASE_URL } from "@/constants/constdata";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { queryClient } from "@/main";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  logout: () => void;
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

      setUser: (user) => set({ user }),

      logout: async () => {
        try {
          // Call backend to clear HttpOnly cookie
          await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN.LOGOUT}`, {
            method: "POST",
            credentials: "include",
          });
        } catch (error) {
          console.error("Logout API call failed:", error);
        }

        // 🔥 Clear all React Query cache to prevent tenant data leakage
        await queryClient.cancelQueries(); // Cancel any in-flight queries
        queryClient.clear();

        // Clear local state
        set({ user: null, error: null });
        localStorage.removeItem("auth-storage");

        // Clear all browser storage to be extra safe
        sessionStorage.clear();
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

        return user.role === role;
      },

      getTenantId: () => {
        return get().user?.tenantId || null;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
