import { Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Attendance from "../pages/attendance";
import Items from "../pages/items";
import Reports from "../pages/reports";

import Layout from "../components/organisms/layout/layout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login pages (NO layout) */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard + other pages WITH layout */}
      <Route element={<Layout children={undefined} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/items" element={<Items />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
