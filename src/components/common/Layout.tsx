import { useState, type ReactNode } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-70 bg-white  shadow-lg h- transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-0`}
      >
        <Sidebar open={sidebarOpen} />
      </div>

      {/* Blur Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Navigation */}
        <Nav
          username="John Doe"
          position="Administrator"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Page Content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}

