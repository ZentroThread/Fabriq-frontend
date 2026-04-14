import { type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../utils/style";

interface SidebarButtonProps {
  icon: LucideIcon;
  label: string;
  to: string;
  active: boolean;
  onClick: () => void;
}

function SidebarButton({
  icon: Icon,
  label,
  to,
  active,
  onClick,
}: SidebarButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    navigate(to);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-60 h-14 ml-5 mt-3 p-3 pl-6 rounded-2xl flex items-center cursor-pointer transition-all",
        active
          ? "bg-linear-to-r from-sidebar-button-active-from to-sidebar-button-active-to shadow-md"
          : "bg-sidebar-button-inactive hover:shadow-sm hover:bg-sidebar-button-hover"
      )}
    >
      <Icon className={active ? "text-text-active" : "text-text-inactive"} />
      <span
        className={`pl-6 font-medium ${
          active ? "text-text-active" : "text-text-inactive"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default SidebarButton;
