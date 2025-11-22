import { useState } from "react";
import Support from "./Support";
import SidebarButton from "./SidebarButton";
import { sidebarItems } from "../../config/SidebarItems";
import type { UserRole } from "../../config/SidebarItems";

function Sidebar({ open: _open }: { open: boolean }) {
  const [activeRoute, setActiveRoute] = useState<string>("/");

  //get the user role dynamically from JWT auth
  const role = (localStorage.getItem("role") as UserRole) || "owner";

  const items = sidebarItems[role];

  return (
    <div className="w-[300px] h-full m-0 shadow-lg flex flex-col bg-sidebar-bg">
      {items.map((item) => (
        <SidebarButton
          key={item.to}
          icon={item.icon}
          label={item.label}
          to={item.to}
          active={activeRoute === item.to}
          onClick={() => setActiveRoute(item.to)}
        />
      ))}
      <Support />
    </div>
  );
}

export default Sidebar;
