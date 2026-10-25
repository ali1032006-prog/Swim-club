"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { COOKIE_THEME, writeCookie } from "@/lib/cookies";
import type { ThemePreference } from "@/lib/theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";
const ANIMATION_CLASS = "theme-anim";
const ANIMATION_MS = 500;

function subscribeToSystemTheme(onChange: () => void) {
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSystemPrefersDark = () => window.matchMedia(DARK_QUERY).matches;
const getServerSystemPrefersDark = () => false;

interface ThemeContextValue {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  initialTheme: ThemePreference;
  children: ReactNode;
}

export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  const [preference, setPreference] = useState<ThemePreference>(initialTheme);
  const systemPrefersDark = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemPrefersDark,
    getServerSystemPrefersDark,
  );
  const animationTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const isDark = preference === "dark" || (preference === "system" && systemPrefersDark);

  useEffect(() => {
    const root = document.documentElement;
    if (preference === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", preference);
  }, [preference]);

  useEffect(() => () => clearTimeout(animationTimer.current), []);

  const toggle = useCallback(() => {
    const next: ThemePreference = isDark ? "light" : "dark";
    const root = document.documentElement;

    // Ease colours only for the duration of the switch, so normal interactions stay snappy.
    root.classList.add(ANIMATION_CLASS);
    clearTimeout(animationTimer.current);
    animationTimer.current = setTimeout(() => root.classList.remove(ANIMATION_CLASS), ANIMATION_MS);

    setPreference(next);
    writeCookie(COOKIE_THEME, next);
  }, [isDark]);

  const value = useMemo(() => ({ isDark, toggle }), [isDark, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}
