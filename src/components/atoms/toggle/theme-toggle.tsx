import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";
import { cn } from "@/utils/style";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  const iconClass = "w-5 h-5";

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all hover:bg-button-hover"
    >
      {isDark ? (
        <Sun
          className={cn(iconClass, "text-yellow-400 hover:text-icon-hover")}
        />
      ) : (
        <Moon
          className={cn(iconClass, "text-icon-dark hover:text-icon-hover")}
        />
      )}
    </button>
  );
}
