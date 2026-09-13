import { useEffect, useState } from "react";

/**
 * Minimal history router.
 *
 * The site is a flat set of informational pages: no nested layouts, no route
 * parameters, no data loaders. That is a poor trade for a routing dependency,
 * so this is the whole router — a subscription to `history`, plus one document
 * level click handler.
 *
 * The click handler is what keeps the rest of the codebase unchanged. Every
 * `<a href="/...">` already written in the navbar, the drawer and the footer
 * becomes a client-side navigation without being rewritten as a `<Link>`, and
 * any link this router should not own — external hosts, `tel:`, `mailto:`,
 * in-page hashes, downloads, and modified or middle clicks — falls through to
 * the browser untouched.
 */

const listeners = new Set<() => void>();

/** Current pathname, with any trailing slash removed so `/faq/` === `/faq`. */
export function currentPath(): string {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export function navigate(to: string, options?: { replace?: boolean }): void {
  const url = new URL(to, window.location.href);
  const samePage = url.pathname.replace(/\/+$/, "") === currentPath();

  window.history[options?.replace ? "replaceState" : "pushState"]({}, "", url);
  if (!samePage || url.hash === "") listeners.forEach((listener) => listener());
}

export function useRoute(): string {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const update = () => setPath(currentPath());
    listeners.add(update);
    window.addEventListener("popstate", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("popstate", update);
    };
  }, []);

  return path;
}

/**
 * Turns same-origin anchor clicks into client-side navigations.
 *
 * Everything this deliberately ignores is listed in the guard clauses below;
 * each one is a case where taking over the click would break the browser
 * behaviour a visitor is entitled to (opening in a new tab, downloading a file,
 * dialling a number, jumping to an anchor on the current page).
 */
export function useLinkInterception(): void {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      if (anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (/^[a-z]+:/i.test(href) && !/^https?:/i.test(href)) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

/**
 * On navigation: return to the top of the document and move focus to the main
 * landmark, so a screen reader announces the new page instead of leaving the
 * user's focus stranded on the link they just followed in the old one.
 */
export function useRouteChangeEffects(path: string): void {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
      return;
    }

    window.scrollTo(0, 0);
    const main = document.getElementById("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
      main.removeAttribute("tabindex");
    }
  }, [path]);
}
