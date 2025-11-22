import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
/* import EmployeeOverview from "./pages/EmployeeOverview";
import EmployeeProfile from "./pages/employee/EmployeeProfile"; */
import { SalaryHistory } from "./pages/employee/SalaryHistory";


function App() {
  return (
    <Layout>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emp" element={<SalaryHistory />} />
      </Routes>
    </Layout>
  );
}

export default App;
