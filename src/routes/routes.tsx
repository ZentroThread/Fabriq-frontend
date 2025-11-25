import { Routes as RouterRoutes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Reports from "../pages/reports";

function Routes() {
  return (
    <div>
      <RouterRoutes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
      </RouterRoutes>
    </div>
  );
}

export default Routes;
