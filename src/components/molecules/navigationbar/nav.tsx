import { Menu } from "lucide-react";
import logo from "../../../assets/images/logo.jpg";
import { Bell, X } from "lucide-react";
import ThemeToggle from "../../atoms/toggle/theme-toggle";

function Nav({
  username,
  position,
  sidebarOpen,
  setSidebarOpen,
}: {
  username: string;
  position: string;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}) {
  return (
    <div className="w-full h-20 m-0 shadow-lg flex items-center bg-nav-bg px-5 relative z-40 text-nav-text">
      <div className="flex gap-6 items-center ">
        <button
          className="block md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="p-0.5 " /> : <Menu className="p-0.5" />}
        </button>
        <img src={logo} alt="logo" className="w-30" />
      </div>

      <div className="ml-auto flex gap-6 items-center">
        <ThemeToggle />
        <Bell className="mr-3 p-0.5" />
        <div className="w-12 h-12 bg-avatar-bg rounded-full border border-avatar-border" />
        <div className="flex flex-col mr-5 text-left">
          <span className="text-sm font-semibold">{username}</span>
          <span className="text-xs text-position-text">{position}</span>
        </div>
      </div>
    </div>
  );
}

export default Nav;
