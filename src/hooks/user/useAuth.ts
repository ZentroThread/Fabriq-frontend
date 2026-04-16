import { useAuthStore } from "@/store/user-auth-store";

export const useAuth = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return { user, login, logout, initializeAuth };
};
