

import Routes from "./routes/routes";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      
        <Routes />
      
    </ThemeProvider>
  );
}

export default App;
