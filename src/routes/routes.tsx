import { Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Attendance from "../pages/attendance";
import Items from "../pages/items";
import Reports from "../pages/reports";
import Attendance from "@/pages/attendance";
import Items from "@/pages/items";
import { RentsAndBill } from "@/pages/RentsAndBill";
import EmployeeOverview from "@/pages/EmployeeOverview";
import EmployeeProfile from "@/pages/employee/EmployeeProfile";
import { SalaryHistory } from "@/pages/employee/SalaryHistory";

import Layout from "../components/organisms/layout/layout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login pages (NO layout) */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard + other pages WITH layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/items" element={<Items />} />
        <Route path="/reports" element={<Reports />} />
    
        <Route path="/attire" element={<Items />} />
        <Route path="/rent" element={<RentsAndBill />} />
        <Route path="/emp" element={<EmployeeOverview />} />
        <Route path="/emp/:id" element={<EmployeeProfile />} />
        <Route path="/salary-history/:id" element={<SalaryHistory />} />
       </Route>
     </Routes>
  );
}
