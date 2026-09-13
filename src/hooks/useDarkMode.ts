import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "bmc-theme";

function readInitial(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

/**
 * Toggles `.dark` on <html> and remembers the choice.
 *
 * The site opens light whatever the operating system is set to; dark is opt-in
 * through this toggle and is remembered afterwards. The initial class is set by
 * an inline script in index.html so there is no theme flash.
 *
 * Writes are wrapped because Safari private mode throws on localStorage access
 * rather than returning null.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      /* storage unavailable: the theme still applies for this session */
    }
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((value) => !value), []);

  return { isDark, toggle };
}
