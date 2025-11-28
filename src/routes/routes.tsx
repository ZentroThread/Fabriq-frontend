import { Routes as RouterRoutes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Reports from "../pages/reports";
import Attendance from "@/pages/attendance";
import Items from "@/pages/items";
import { RentsAndBill } from "@/pages/RentsAndBill";
import EmployeeOverview from "@/pages/EmployeeOverview";
import EmployeeProfile from "@/pages/employee/EmployeeProfile";
import { SalaryHistory } from "@/pages/employee/SalaryHistory";
import LeaveHistory from "@/pages/employee/LeaveHistory";

function Routes() {
  return (
    <div>
      <RouterRoutes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/attire" element={<Items />} />
        <Route path="/rent" element={<RentsAndBill />} />
        <Route path="/emp" element={<EmployeeOverview />} />
        <Route path="/emp/:id" element={<EmployeeProfile />} />
        <Route path="/salary-history/:id" element={<SalaryHistory />} />
        <Route path="/leave-history/:id" element={<LeaveHistory />} />
      </RouterRoutes>
    </div>
  );
}

export default Routes;
