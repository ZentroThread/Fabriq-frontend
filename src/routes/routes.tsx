import { Routes as RouterRoutes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Reports from "../pages/reports";
import Attendance from "@/pages/attendance";
import Items from "@/pages/items";

function Routes() {
  return (
    <div>
      <RouterRoutes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/attire" element={<Items />} />
      </RouterRoutes>
    </div>
  );
}

export default Routes;
