import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  // Apply theme class on mount and when dark changes
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggleTheme = () => {
    const newValue = !dark;
    setDark(newValue);

    if (newValue) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all hover:bg-button-hover"
    >
      {dark ? (
        <Sun className="w-5 h-5 text-yellow-400 hover:text-icon-hover" />
      ) : (
        <Moon className="w-5 h-5 text-icon-dark hover:text-icon-hover" />
      )}
    </button>
  );
}
