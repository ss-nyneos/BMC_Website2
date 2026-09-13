import { useMediaQuery } from "./useMediaQuery";

/**
 * Single source of truth for motion. Every animated component reads this and
 * ships a static equivalent when it is true. Spec section 8.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
