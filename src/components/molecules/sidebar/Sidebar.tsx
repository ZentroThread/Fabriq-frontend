import { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 03a124d306d90a69d93e5c3cb44b64e15c2682ac
import Support from "../support/support";
import SidebarButton from "../../atoms/iconbutton/side-button";
import { sidebarItems } from "../../../config/sidebar-items";
import type { UserRole } from "../../../config/sidebar-items";

function Sidebar({ open: _open }: { open: boolean }) {
<<<<<<< HEAD
  const [activeRoute, setActiveRoute] = useState<string>("/");
  const navigate = useNavigate();
=======
  const [activeRoute, setActiveRoute] = useState<string>("/dashboard");
>>>>>>> 03a124d306d90a69d93e5c3cb44b64e15c2682ac

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
<<<<<<< HEAD
          onClick={() => {
            setActiveRoute(item.to);
            navigate(item.to);   
          }}
=======
          onClick={() => setActiveRoute(item.to)}
>>>>>>> 03a124d306d90a69d93e5c3cb44b64e15c2682ac
        />
      ))}
      <Support />
    </div>
  );
}

export default Sidebar;
