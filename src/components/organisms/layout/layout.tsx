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