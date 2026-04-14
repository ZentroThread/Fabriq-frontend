import { useLocation } from "react-router-dom";
import SidebarButton from "../../atoms/iconbutton/side-button";
import { sidebarItems } from "../../../config/sidebar-items";
import { useAuthStore } from "@/store/user-auth-store";
import { cn } from "@/utils/style";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export default function Sidebar({ className, onNavigate }: SidebarProps) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const role = user?.role || "unknown";
  const items = sidebarItems[role as keyof typeof sidebarItems] || [];
  const pathname = location.pathname;

  return (
    <aside
      className={cn(
        "w-[300px] h-full m-0 shadow-lg flex flex-col bg-sidebar-bg shrink-0",
        className
      )}
      aria-label="Main Navigation"
    >
      <nav className="flex flex-col flex-1 py-4 gap-1 overflow-y-auto overflow-x-hidden">
        {items.map((item) => {
          const isActive =
            item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);

          return (
            <SidebarButton
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              active={isActive}
              onClick={() => {
                if (onNavigate) onNavigate();
              }}
            />
          );
        })}
      </nav>
    </aside>
  );
}
