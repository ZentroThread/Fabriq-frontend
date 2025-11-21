import { useState, type ReactNode } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import AddButton from "./AddButton";

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden flex-col">
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
          className={`fixed top-20 left-0 bottom-0 z-30 w-[300px] bg-white shadow-lg transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:top-0`}
        >
          <Sidebar open={sidebarOpen} />
        </div>

        {/* Blur Overlay - Only covers main content area, below navbar and sidebar */}
        {sidebarOpen && (
          <div
            className="fixed top-20 left-0 right-0 bottom-0 z-20 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
