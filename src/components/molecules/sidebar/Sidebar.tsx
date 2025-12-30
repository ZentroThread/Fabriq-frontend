import { useState } from "react";

import Support from "../support/support";
import SidebarButton from "../../atoms/iconbutton/side-button";
import { sidebarItems } from "../../../config/sidebar-items";
import { useAuthStore } from "@/store/user-auth-store";

function Sidebar({ open: _open }: { open: boolean }) {
  const [activeRoute, setActiveRoute] = useState<string>("/");

  // Get the user role dynamically from Zustand auth store
  const user = useAuthStore((state) => state.user);
  const role = user?.role || "owner";

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
