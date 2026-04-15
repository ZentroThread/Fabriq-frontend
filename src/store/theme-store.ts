import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light" | "system";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "system",

      setTheme: (theme: Theme) => {
        set({ theme });
        applyTheme(theme);
      },

      initializeTheme: () => {
        const currentTheme = get().theme;
        applyTheme(currentTheme);
      },
    }),
    {
      name: "theme-storage",
    }
  )
);

function applyTheme(theme: Theme) {
  const root = window.document.documentElement;

  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}

if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  mediaQuery.addEventListener("change", () => {
    const store = useThemeStore.getState();
    if (store.theme === "system") {
      applyTheme("system");
    }
  });
}
