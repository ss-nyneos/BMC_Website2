import { MoonIcon, SunIcon } from "../../assets/icons";
import { useDarkMode } from "../../hooks/useDarkMode";

/**
 * Theme switch. Announced as a switch with its current state, and labelled by
 * what it will do rather than by the icon it happens to be showing.
 */
export function DarkModeToggle({ className = "" }: { className?: string }) {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      className={`grid h-11 w-11 place-items-center rounded-pill border border-line transition-colors duration-200 ease-out-quint hover:bg-lavender-soft hover:text-ink ${className}`}
    >
      {isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
      <span className="sr-only">{isDark ? "Switch to light theme" : "Switch to dark theme"}</span>
    </button>
  );
}
