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
      className={`grid h-12 w-12 place-items-center rounded-pill text-fg transition-[background-color,color,transform] duration-300 ease-out-expo hover:bg-lavender-soft hover:text-ink active:scale-95 ${className}`}
    >
      {/* Keyed so the new icon spins in each time the theme flips. */}
      {isDark ? (
        <MoonIcon key="moon" className="h-5 w-5 animate-pop-spin" />
      ) : (
        <SunIcon key="sun" className="h-5 w-5 animate-pop-spin" />
      )}
      <span className="sr-only">{isDark ? "Switch to light theme" : "Switch to dark theme"}</span>
    </button>
  );
}
