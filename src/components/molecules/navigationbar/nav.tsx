import { Menu, LogOut, X } from "lucide-react";
import logo from "../../../assets/images/logo.png";
import ThemeToggle from "../../atoms/toggle/theme-toggle";
import { useAuthStore } from "@/store/user-auth-store";

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

  const handleLogout = () => {
    logout();
  };

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
        {/* <button
          className="  hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Notifications"
        >
          <Bell className="mr-3 p-0.5" />
        </button> */}
        <ChangePasswordDialog>
          <button
            className="w-12 h-12 bg-avatar-bg rounded-full border border-avatar-border hover:opacity-80 transition-opacity cursor-pointer"
            title="Change Password"
          />
        </ChangePasswordDialog>
        <div className="flex flex-col text-left">
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
            className="ml-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
