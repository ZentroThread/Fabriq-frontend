import { Menu, LogOut, X } from "lucide-react";
import logo from "../../../assets/images/logo.png";
import ThemeToggle from "../../atoms/toggle/theme-toggle";
import { useAuthStore } from "@/store/user-auth-store";
import ChatWidget from "../../organisms/ChatWidget";
import { AlertDialogDemo } from "../../atoms/alert/alert-dialog";
import { ChangePasswordDialog } from "../dialog/change-password-dialog";
import { cn } from "@/utils/style";

interface NavProps {
  username: string;
  position: string;
  sidebarOpen: boolean;
  className?: string; 
  setSidebarOpen: (v: boolean) => void;
}

const getRole = (pos: string) => {
  const p = pos.toLowerCase();
  if (p.includes("sales")) return "SALES_ASSISTANT";
  if (p.includes("cashier")) return "CASHIER";
  return "UNKNOWN";
};

export default function Nav({
  username,
  position,
  sidebarOpen,
  setSidebarOpen,
  className,
}: NavProps) {
  const logout = useAuthStore((state) => state.logout);

  const myRole = getRole(position);

  return (
    <header
      className={cn(
        "w-full h-20 m-0 shadow-lg flex items-center bg-nav-bg px-3 sm:px-5 relative z-40 text-nav-text",
        className
      )}
    >
      <div className="flex gap-2 sm:gap-6 items-center">
        <button
          type="button"
          className="block md:hidden p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <img src={logo} alt="Company logo" className="w-24 sm:w-30" />
      </div>

      <nav className="ml-auto flex gap-2 sm:gap-4 md:gap-6 items-center">
        <ThemeToggle />

        <ChatWidget myRole={myRole} />

        <ChangePasswordDialog>
          <button
            type="button"
            className="w-9 h-9 sm:w-12 sm:h-12 bg-avatar-bg rounded-full border border-avatar-border hover:opacity-80 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            title="Change Password"
            aria-label="Change Password"
          >
            <span className="sr-only">Change Password Profile Avatar</span>
          </button>
        </ChangePasswordDialog>

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-sm font-semibold">{username}</span>
          <span className="text-xs text-position-text">{position}</span>
        </div>

        <AlertDialogDemo
          title="Confirm Logout"
          description="Are you sure you want to logout? You will need to enter your username and password to login again."
          cancel="Cancel"
          yes="Logout"
          onConfirm={logout}
        >
          <button
            type="button"
            className="ml-1 sm:ml-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </AlertDialogDemo>
      </nav>
    </header>
  );
}
