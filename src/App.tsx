import Layout from "./components/organisms/layout/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./providers/ThemeProvider";
import { RentsAndBill } from "./pages/RentsAndBill";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rent" element={<RentsAndBill/>} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
