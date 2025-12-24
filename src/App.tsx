import { useEffect } from "react";
import Routes from "./routes/routes";
import { useThemeStore } from "./store/theme-store";
import { useAuthStore } from "./store/user-auth-store"; // Add this


function App() {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);
const initializeAuth = useAuthStore((state) => state.initializeAuth);
  // Initialize theme when app loads
  useEffect(() => {
    initializeTheme();
    initializeAuth(); // Add this
  }, [initializeTheme,initializeAuth]);

  return (
      <Routes />
  );
}

export default App;
