import { useEffect } from "react";
import Routes from "./routes/routes";
import { useTheme } from "./hooks/useTheme"; 
import { useAuth } from "./hooks/useAuth";


function App() {
  const { initializeTheme } = useTheme();   
  const { initializeAuth } = useAuth();    
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
