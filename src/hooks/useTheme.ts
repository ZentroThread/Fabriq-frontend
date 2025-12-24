import { useThemeStore } from '@/store/theme-store';

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const initializeTheme = useThemeStore((state) => state.initializeTheme);
  
  return { theme, setTheme, initializeTheme };
};