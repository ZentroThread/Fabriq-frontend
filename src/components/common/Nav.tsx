import { Menu } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import { Bell , X } from "lucide-react";

function Nav({ username, position, sidebarOpen, setSidebarOpen }: { username: string; position: string;
   sidebarOpen:boolean; 
  setSidebarOpen: (v: boolean) => void;  }) {
  return (
    <div className="w-full h-20 m-0 shadow-lg flex items-center bg-white px-5 relative">
      <div className="flex gap-6 items-center">
        <button
          className="block md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="p-0.5" />
          ) : (
            <Menu className="p-0.5" />
          )}
        </button>
        <img src={logo} alt="logo" className="w-30" />
      </div>

      <div className="ml-auto flex gap-6 items-center">
        <Bell className="mr-3 p-0.5" />
        <div className="w-12 h-12 bg-[#f0ddd5] rounded-full border border-[#AB7057]" />
        <div className="flex flex-col mr-5 text-left">
          <span className="text-sm font-semibold">{username}</span>
          <span className="text-xs text-gray-500">{position}</span>
        </div>
      </div>
    </div>
  );
}

export default Nav;
