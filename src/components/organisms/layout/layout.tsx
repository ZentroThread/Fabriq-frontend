import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Nav from "../../molecules/navigationbar/nav";
import Sidebar from "../../molecules/sidebar/Sidebar";
import AIAssistant from "../../molecules/chatbot/AIAssistant";
import { useAuthStore } from "@/store/user-auth-store";
import { cn } from "@/utils/style";
import { logger } from "@/utils/logger";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const noLayoutPages = ["/", "/login"];
  const hideLayout = noLayoutPages.includes(location.pathname);

  if (hideLayout) {
    return <Outlet />; 
  }
  const formatRole = (role?: string) => {
    if (!role) return "";
    try {
      return role
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    } catch (error) {
      logger.warn("Failed to format role string", error, false);
      return role || "";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden flex-col bg-layout-bg">
      {/* Navbar */}
      <div className="relative z-40">
        <Nav
          username={user?.username || "User"}
          position={user ? formatRole(user.role) : ""}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed top-20 left-0 bottom-0 z-30 w-[300px] bg-sidebar-bg shadow-lg transform transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            "md:translate-x-0 md:static md:top-0"
          )}
        >
          <Sidebar />
        </div>
        {sidebarOpen && (
          <div
            className="fixed top-20 left-0 right-0 bottom-0 z-20 bg-overlay-bg/30 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        <main className="flex-1 overflow-auto p-4 bg-main-bg">
          <Outlet />
        </main>
      </div>
      <AIAssistant />
    </div>
  );
}
export default Layout;
