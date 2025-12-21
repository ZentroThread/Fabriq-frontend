import { useEffect } from "react";
import Routes from "./routes/routes";
import { useThemeStore } from "./store/theme-store";

function App() {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  // Initialize theme when app loads
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
      <Routes />
  );
}

export default App;
