import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../../hooks/hooks";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all hover:bg-button-hover"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400 hover:text-icon-hover" />
      ) : (
        <Moon className="w-5 h-5 text-icon-dark hover:text-icon-hover" />
      )}
    </button>
  );
}
