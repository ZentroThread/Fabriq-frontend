import { Menu, LogOut, X } from "lucide-react";
import logo from "../../../assets/images/logo.png";
import ThemeToggle from "../../atoms/toggle/theme-toggle";
import { useAuthStore } from "@/store/user-auth-store";
import ChatWidget from "../../organisms/ChatWidget";

import { AlertDialogDemo } from "../../atoms/alert/alert-dialog";
import { ChangePasswordDialog } from "../dialog/change-password-dialog";

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
  const logout = useAuthStore((state) => state.logout);

  // Normalize position to role
  const getRole = (pos: string) => {
    const p = pos.toLowerCase();
    if (p.includes("sales")) return "SALES_ASSISTANT";
    if (p.includes("cashier")) return "CASHIER";
    return "UNKNOWN";
  };

  const myRole = getRole(position);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full h-20 m-0 shadow-lg flex items-center bg-nav-bg px-3 sm:px-5 relative z-40 text-nav-text">
      <div className="flex gap-2 sm:gap-6 items-center ">
        <button
          className="block md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="p-0.5 " /> : <Menu className="p-0.5" />}
        </button>
        <img src={logo} alt="logo" className="w-24 sm:w-30" />
      </div>

      <div className="ml-auto flex gap-2 sm:gap-4 md:gap-6 items-center">
        <ThemeToggle />

        {/* Chat Widget replaces the static bell icon */}
        <ChatWidget myRole={myRole} />

        <ChangePasswordDialog>
          <button
            className="w-9 h-9 sm:w-12 sm:h-12 bg-avatar-bg rounded-full border border-avatar-border hover:opacity-80 transition-opacity cursor-pointer"
            title="Change Password"
          />
        </ChangePasswordDialog>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-sm font-semibold">{username}</span>
          <span className="text-xs text-position-text">{position}</span>
        </div>
        <AlertDialogDemo
          title="Confirm Logout"
          description="Are you sure you want to logout? It requires username and password again login"
          cancel="Cancel"
          yes="Logout"
          onConfirm={handleLogout}
        >
          <button
            className="ml-1 sm:ml-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </AlertDialogDemo>
      </div>
    </div>
  );
}

export default Nav;
