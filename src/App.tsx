import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
    </ThemeProvider>
  );
}

export default App;
