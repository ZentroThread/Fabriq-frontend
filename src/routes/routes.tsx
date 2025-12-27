import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Reports from "../pages/reports";
import Attendance from "@/pages/attendance";
import Items from "@/pages/items";
import { RentsAndBill } from "@/pages/rentsandbills";
import Customers from "@/pages/customers";
import EmployeeOverview from "@/pages/employee-overview";
import EmployeeProfile from "@/pages/employee-profile";
import { SalaryHistory } from "@/pages/salary-history";
import Login from "../pages/login";
import Layout from "../components/organisms/layout/layout";
import LeaveHistory from "@/pages/leave-history";
import { ProtectedRoute } from "@/routes/protected-route";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - Login pages (NO layout) */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes WITH layout and authentication */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {/* Dashboard - All authenticated users */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Employees - Owner only */}
          <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
            <Route path="/emp" element={<EmployeeOverview />} />
            <Route path="/emp/:id" element={<EmployeeProfile />} />
            <Route path="/salary-history/:id" element={<SalaryHistory />} />
            <Route path="/leave-history/:id" element={<LeaveHistory />} />
          </Route>

          {/* Attendance - Owner only */}
          <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
            <Route path="/attendance" element={<Attendance />} />
          </Route>

          {/* Rentals & Billing - Owner and Cashier */}
          <Route
            element={<ProtectedRoute allowedRoles={["owner", "cashier"]} />}
          >
            <Route path="/rent" element={<RentsAndBill />} />
            <Route path="/customers" element={<Customers />} />
          </Route>

          {/* Items - Owner and Sales Assistant */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["owner", "sales_assistant"]} />
            }
          >
            <Route path="/items" element={<Items />} />
            <Route path="/attire" element={<Items />} />
          </Route>

          {/* Reports - Owner only */}
          <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default AppRoutes;
