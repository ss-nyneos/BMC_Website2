import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "../../assets/icons";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const RADIUS = 25;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Back-to-top control that pops up once the visitor is well past the first
 * screen. Its ring fills with scroll progress, so it doubles as a quiet "how
 * much page is left" gauge on the long homepage.
 *
 * While hidden it is `inert`, which takes it out of the tab order and the
 * accessibility tree together; set in a layout effect so it lands before the
 * frame that shows it. After jumping to the top, focus moves to the main
 * landmark rather than staying on a button that has just disappeared.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setVisible(window.scrollY > window.innerHeight * 1.1);
      ringRef.current?.style.setProperty("stroke-dashoffset", String(CIRCUMFERENCE * (1 - progress)));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useLayoutEffect(() => {
    const node = buttonRef.current;
    if (!node) return;
    if (visible) node.removeAttribute("inert");
    else node.setAttribute("inert", "");
  }, [visible]);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    const main = document.getElementById("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
      main.removeAttribute("tabindex");
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`group fixed bottom-5 right-5 z-sticky grid h-14 w-14 place-items-center rounded-pill bg-ink text-white shadow-pill-hover dark:bg-[#1E7AF0] dark:text-white transition-[opacity,transform] duration-500 ease-out-expo hover:-translate-y-1 active:scale-95 sm:bottom-8 sm:right-8 ${
        visible ? "scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-50 opacity-0"
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          className="stroke-white/20 dark:stroke-white/25"
        />
        <circle
          ref={ringRef}
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          className="stroke-[#4E9AF5] dark:stroke-white"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <ArrowRightIcon className="relative h-5 w-5 -rotate-90 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5" />
    </button>
  );
}
