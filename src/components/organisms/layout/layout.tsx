<<<<<<< HEAD
import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom"; 
import Nav from "../../molecules/navigationbar/nav";
import Sidebar from "../../molecules/sidebar/Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const noLayoutPages = ["/", "/login"];
  const hideLayout = noLayoutPages.includes(location.pathname);

  if (hideLayout) {
    return <Outlet />;   // <-- Login page will render here
  }

  return (
    <div className="flex h-screen overflow-hidden flex-col bg-layout-bg">
      {/* Navbar */}
      <div className="relative z-40">
        <Nav
          username="John Doe"
          position="Administrator"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div
          className={`fixed top-20 left-0 bottom-0 z-30 w-[300px] bg-sidebar-bg shadow-lg transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:top-0`}
        >
          <Sidebar open={sidebarOpen} />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed top-20 left-0 right-0 bottom-0 z-20 bg-overlay-bg/30 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* CONTENT (Dashboard, Attendance, Items, Reports) */}
        <main className="flex-1 overflow-auto p-4 bg-main-bg">
          <Outlet />  
        </main>
      </div>
    </div>
  );
}
export default Layout;
=======
import { useState, type ReactNode } from "react";
import Nav from "../../molecules/navigationbar/nav";
import Sidebar from "../../molecules/sidebar/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden flex-col bg-layout-bg">
      {/* Navigation - Always on top with highest z-index */}
      <div className="relative z-40">
        <Nav
          username="John Doe"
          position="Administrator"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Content area with sidebar */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - Positioned below navbar */}
        <div
          className={`fixed top-20 left-0 bottom-0 z-30 w-[300px] bg-sidebar-bg shadow-lg transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:top-0`}
        >
          <Sidebar open={sidebarOpen} />
        </div>

        {/* Blur Overlay - Only covers main content area, below navbar and sidebar */}
        {sidebarOpen && (
          <div
            className="fixed top-20 left-0 right-0 bottom-0 z-20 bg-overlay-bg/30 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 overflow-auto p-4 bg-main-bg">{children}</main>
      </div>
    </div>
  );
}
>>>>>>> 03a124d306d90a69d93e5c3cb44b64e15c2682ac
