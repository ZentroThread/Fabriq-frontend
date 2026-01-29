import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Reports from "../pages/reports";
import Attendance from "@/pages/attendance";
import Items from "@/pages/items";
import { RentsAndBill } from "@/pages/rentsandbills";
import Customers from "@/pages/customers";
import Bills from "@/pages/bills";
import EmployeeOverview from "@/pages/employee-overview";
import EmployeeProfile from "@/pages/employee-profile";
import { SalaryHistory } from "@/pages/salary-history";
import Login from "../pages/login";
import Layout from "../components/organisms/layout/layout";
import LeaveHistory from "@/pages/leave-history";
import AdvancePaymentOverviewPage from "@/pages/advance-payment-overview";
import ProductionOverview from "@/pages/production-overview";
import { ProtectedRoute } from "@/routes/protected-route";
import MonthlySalary from "@/pages/monthly-salary";
import EpfEtfHistoryPage from "@/pages/epf-etf-history";
import AddEmployee from "@/pages/add-employee";
import ItemsWishlist from "@/pages/items-wishlist";
import ItemsHistory from "@/pages/items-history";

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

          {/* Employees - Owner only */}
          <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
            <Route path="/emp" element={<EmployeeOverview />} />
            <Route path="/emp/:id" element={<EmployeeProfile />} />
            <Route path="/salary-history/:id" element={<SalaryHistory />} />
            <Route path="/leave-history/:id" element={<LeaveHistory />} />
            <Route
              path="/production-overview/:id"
              element={<ProductionOverview />}
            />
            <Route
              path="/advance-payment-overview/:id"
              element={<AdvancePaymentOverviewPage />}
            />
            <Route
              path="/monthly-salary/:id/:year/:month"
              element={<MonthlySalary />}
            />
            <Route path="/epf-etf-history" element={<EpfEtfHistoryPage />} />
            <Route path="/add-employee" element={<AddEmployee />} />
          </Route>

          {/* Attendance - Owner only */}
          <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
            <Route path="/attendance" element={<Attendance />} />
          </Route>

          {/* Rentals & Billing - Owner, Cashier and Sales Assistant */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["owner", "cashier", "sales_assistant"]}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rent" element={<RentsAndBill />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/customers" element={<Customers />} />
          </Route>

          {/* Items - Owner and Sales Assistant */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["owner", "sales_assistant", "cashier"]}
              />
            }
          >
            <Route path="/items" element={<Items />} />
            <Route path="/attire" element={<Items />} />
            <Route path="/items/wishlist" element={<ItemsWishlist />} />
            <Route path="/items/history" element={<ItemsHistory />} />
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
